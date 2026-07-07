import {
    LitElement,
    html,
    css,
    CSSResultGroup,
    PropertyValueMap,
    nothing,
} from "lit";
import { property, state, query } from "lit/decorators.js";
import "../elements/ytmusic-media-control";
import "../elements/ytmusic-browser";
import "./ytmusic-playing-card-editor";
import { areDeeplyEqual, YTMusicItem } from "../utils/utils";
import { CastAudioIcon, PlayIcon, PauseIcon, SkipNextIcon } from "../utils/icons";

// source: where to look for this item ("root" = root browse children, "home" = Home section children)
// titleKey: case-insensitive partial match against item.title (must match the YouTube Music API language)
const YT_FILTERS_LABELS: Record<string, string[]> = {
    it: ["Per te", "Scelte rapide", "Dalla community", "Radio per te", "Playlist", "Recenti"],
    en: ["For You", "Quick picks", "From the community", "Radio for you", "Playlists", "Recent"],
};

const YT_SEARCH_PLACEHOLDER: Record<string, string> = {
    it: "Brani, album, artisti...",
    en: "Songs, albums, artists...",
};

function getUILang(): string {
    const lang = (navigator.language || "en").toLowerCase();
    if (lang.startsWith("it")) return "it";
    return "en";
}

function getYTFilters() {
    const lang = getUILang();
    const labels = YT_FILTERS_LABELS[lang] ?? YT_FILTERS_LABELS["en"];
    return [
        { label: labels[0], source: "root", titleKey: "home" },
        { label: labels[1], source: "home", titleKey: "scelte" },
        { label: labels[2], source: "home", titleKey: "community" },
        { label: labels[3], source: "home", titleKey: "radio" },
        { label: labels[4], source: "root", titleKey: "playlist" },
        { label: labels[5], source: "root", titleKey: "last played" },
    ];
}

const YT_FILTERS = getYTFilters();

const YTLogoSVG = html`
    <svg viewBox="0 0 24 24" class="yt-icon" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FF0000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
`;

const _ytT: Record<string, Record<string, string>> = {
    it: { nowPlaying: "In riproduzione", tabPlay: "Riproduzione", queue: "In coda", noQueue: "Nessuna coda attiva" },
    en: { nowPlaying: "Now Playing", tabPlay: "Playing", queue: "Queue", noQueue: "No active queue" },
};

function _t(key: string): string {
    return (_ytT[getUILang()] ?? _ytT["en"])[key] ?? key;
}

// Music Assistant browse-root category labels, localized for the UI language.
const _MA_CAT_LABELS: Record<string, Record<string, string>> = {
    it: {
        "artists": "Artisti", "albums": "Album", "tracks": "Brani",
        "playlists": "Playlist", "radio stations": "Radio", "radios": "Radio",
        "audiobooks": "Audiolibri", "podcasts": "Podcast", "favorites": "Preferiti",
    },
};
function _maCatLabel(title: string): string {
    const map = _MA_CAT_LABELS[getUILang()];
    if (!map) return title;
    return map[(title ?? "").toLowerCase()] ?? title;
}

const _SEARCH_TYPES_LABELS: Record<string, { label: string; value: string }[]> = {
    it: [
        { label: "Tutto", value: "" }, { label: "Brani", value: "track" },
        { label: "Album", value: "album" }, { label: "Artisti", value: "artist" },
        { label: "Playlist", value: "playlist" }, { label: "Radio", value: "radio" },
    ],
    en: [
        { label: "All", value: "" }, { label: "Tracks", value: "track" },
        { label: "Albums", value: "album" }, { label: "Artists", value: "artist" },
        { label: "Playlists", value: "playlist" }, { label: "Radios", value: "radio" },
    ],
};
function _searchTypes() {
    return _SEARCH_TYPES_LABELS[getUILang()] ?? _SEARCH_TYPES_LABELS["en"];
}

export class YTMusicPlayingCard extends LitElement {
    @state() _config: any = {};
    _hass: any;
    @state() _entity: any;
    @state() _menuOpen: string | null = null;
    @state() _playerExpanded: boolean = true;
    @state() _showQueue: boolean = false;
    @state() _queueTracks: any[] = [];
    @state() _queueLoading: boolean = false;
    @state() _queueCurrentIndex: number = -1;
    @state() _activeFilter: number = 0;
    @state() _popupOpen: boolean = false;
    @state() _popupLoading: boolean = false;
    @state() _popupItems: any[] = [];
    @state() _popupTitle: string = "";
    @state() _popupStack: { title: string; items: any[] }[] = [];
    @state() _categories: { label: string; item?: any; special?: string }[] = [];
    @state() _searchOpen: boolean = false;
    @state() _searchQuery: string = "";
    @state() _searchType: string = "";
    @state() _searchResults: any[] = [];
    @state() _searchLoading: boolean = false;
    @state() _searchActive: boolean = false;
    @state() _enqueueItem: any = null;
    @state() _playersOpen: boolean = false;
    @state() _queueMenuOpen: boolean = false;
    @state() _transferMode: boolean = false;
    @query("ytmusic-browser") _browser: any;
    private _rootItems: any[] = [];
    private _homeItems: any[] = [];
    private _rootLoaded = false;

    static getConfigElement() {
        return document.createElement("ytmusic-playing-card-editor");
    }

    static getStubConfig() {
        return {
            entity_id: "media_player.ytube_music_player",
            header: "YouTube Music",
        };
    }

    setConfig(config: any) {
        if (!config.entity_id) throw new Error("entity_id must be specified");
        this._config = structuredClone(config);
        if (!("header" in this._config)) this._config.header = "YouTube Music";
        if (!("initialAction" in this._config)) {
            this._config.initialAction = new YTMusicItem();
            this._config.initialAction.title = YT_FILTERS_LABELS[getUILang()][0];
            this._config.initialAction.media_content_type = null;
            this._config.initialAction.media_content_id = null;
        }
        if (!("coverNavigation" in this._config)) this._config.coverNavigation = true;
    }

    set hass(hass) {
        this._hass = hass;
        const newEntity = this._hass["states"][this._config["entity_id"]];
        if (!areDeeplyEqual(this._entity, newEntity, [])) {
            this._entity = structuredClone(newEntity);
        }
    }

    protected updated(changedProps: PropertyValueMap<any>) {
        super.updated(changedProps);
        if (changedProps.has("_entity") && this._entity && !this._rootLoaded) {
            this._rootLoaded = true;
            this._loadRoot();
        }
    }

    private get _isMA(): boolean {
        return this._entity?.attributes?.app_id === "music_assistant";
    }

    // Feature toggle read from YAML config. Everything is enabled by default; a user
    // disables a part by setting it to false, e.g. `queue_actions: false`.
    // Known flags: show_search, show_queue, queue_actions, show_chips.
    private _feat(name: string): boolean {
        return this._config?.[name] !== false;
    }

    private async _browseInto(item: any): Promise<any[]> {
        const resp = await this._hass.callWS({
            type: "media_player/browse_media",
            entity_id: this._config.entity_id,
            media_content_type: item?.media_content_type,
            media_content_id: item?.media_content_id,
        });
        return (resp?.children || []).filter(
            (el: any) => !el.media_content_id?.startsWith("MPSP")
        );
    }

    private async _loadRoot() {
        try {
            const rootResp = await this._hass.callWS({
                type: "media_player/browse_media",
                entity_id: this._config.entity_id,
            });
            this._rootItems = (rootResp?.children || []).filter(
                (el: any) => !el.media_content_id?.startsWith("MPSP")
            );

            if (this._isMA) {
                // Music Assistant: keep only the music categories from the browse root,
                // dropping HA media sources (Frigate, Camera, TTS, DLNA, …) and non-music
                // MA sections (Podcasts, Audiobooks, …).
                const MA_MUSIC = ["tracks", "playlists", "radio stations", "radios"];
                const libraryCats = this._rootItems
                    .filter((c: any) => c.can_expand && MA_MUSIC.includes((c.title ?? "").toLowerCase()))
                    .map((c: any) => ({ label: _maCatLabel(c.title), item: c }));
                // Advanced browse: Recommendations (Discover) / Recent / Favorites.
                const browseChips: { label: string; special: string }[] = [];
                if (this._feat("media_browser")) {
                    const it = getUILang() === "it";
                    browseChips.push({ label: it ? "Consigliati" : "Recommendations", special: "recommendations" });
                    browseChips.push({ label: it ? "Recenti" : "Recent", special: "recent" });
                    browseChips.push({ label: it ? "Libreria" : "Library", special: "library" });
                }
                this._categories = [...browseChips, ...libraryCats];
            } else {
                // YouTube Music: cascade into Home, then resolve the curated filters
                const homeItem = this._rootItems.find(
                    (item: any) => item.title?.toLowerCase() === "home"
                ) || this._rootItems[0];
                if (homeItem) {
                    try {
                        this._homeItems = await this._browseInto(homeItem);
                    } catch (e) {
                        console.error("YTube: failed to load home sections", e);
                    }
                }
                const lc = (s: string) => s?.toLowerCase() ?? "";
                this._categories = YT_FILTERS.map((f: any, idx: number) => {
                    const pool = f.source === "home" ? this._homeItems : this._rootItems;
                    let target = pool.find((item: any) => lc(item.title).includes(f.titleKey));
                    if (!target && idx === 0) target = this._rootItems[0];
                    return { label: f.label, item: target };
                }).filter((c: any) => c.item);
            }
        } catch (e) {
            console.error("YTMusic: failed to load root items", e);
        }
    }

    private _navigateToFilter(index: number) {
        if (!this._browser || this._rootItems.length === 0) return;
        const filter = YT_FILTERS[index];
        const pool = filter.source === "home" ? this._homeItems : this._rootItems;
        const lc = (s: string) => s?.toLowerCase() ?? "";
        let target = pool.find((item: any) => lc(item.title).includes(filter.titleKey));
        // Fallback for "Per te": first root item
        if (!target && index === 0) target = this._rootItems[0];
        if (target) this._browser.loadElement(target);
    }

    private async _openChipPopup(category: any, index: number) {
        this._activeFilter = index;
        this._popupTitle = category.label;
        this._popupStack = [];
        this._popupItems = [];
        this._popupOpen = true;
        this._popupLoading = true;
        try {
            if (category.special) {
                this._popupItems = await this._maBrowse(category.special);
            } else if (category.item) {
                this._popupItems = await this._browseInto(category.item);
            }
        } catch (e) {
            console.error("YTMusic: chip popup load failed", e);
        }
        this._popupLoading = false;
    }

    // Normalize a Music Assistant media item (from get_recommendations / get_library)
    // into the popup item shape used by the card.
    private _maItem(it: any): any {
        const artists = Array.isArray(it.artists)
            ? it.artists.map((a: any) => a?.name).filter(Boolean).join(", ")
            : "";
        const name = it.name || it.title || "";
        return {
            title: artists ? `${artists} - ${name}` : name,
            thumbnail: it.image || it.thumbnail || "",
            media_content_id: it.uri || it.media_content_id,
            media_content_type: it.media_type || it.media_content_type || "track",
        };
    }

    // Load one of the advanced browse sections. Returns popup items (leaves or folders).
    private async _maBrowse(kind: string): Promise<any[]> {
        const it = getUILang() === "it";
        if (kind === "recommendations") {
            const res: any = await this._hass.callWS({
                type: "call_service", domain: "mass_queue", service: "get_recommendations",
                service_data: { entity: this._config.entity_id }, return_response: true,
            });
            const folders = res?.response?.response || res?.response || [];
            return (Array.isArray(folders) ? folders : []).map((f: any) => {
                const imgs = (f.items || []).map((x: any) => x.image).filter(Boolean);
                return {
                    title: f.name,
                    thumbnail: f.image || imgs[0] || "",
                    mosaic: !f.image && imgs.length >= 4 ? imgs.slice(0, 4) : null,
                    folderIcon: (!f.image && !imgs.length) ? "mdi:folder-music" : "",
                    children: (f.items || []).map((x: any) => this._maItem(x)),
                };
            });
        }
        if (kind === "recent") {
            const cfg = await this._getMAConfigEntryId(this._config.entity_id);
            const res: any = await this._hass.callWS({
                type: "call_service", domain: "music_assistant", service: "get_library",
                service_data: { config_entry_id: cfg, media_type: "track", order_by: "last_played_desc", limit: 100 },
                return_response: true,
            });
            return (res?.response?.items || []).map((x: any) => this._maItem(x));
        }
        if (kind === "library") {
            // Show the saved library collections by type (lazy-loaded on drill-in).
            const cfg = await this._getMAConfigEntryId(this._config.entity_id);
            const mk = (type: string, label: string, icon: string) => ({
                title: label, folderIcon: icon,
                load: { domain: "music_assistant", service: "get_library",
                    service_data: { config_entry_id: cfg, media_type: type, limit: 300 } },
            });
            return [
                mk("playlist", it ? "Playlist" : "Playlists", "mdi:playlist-music"),
                mk("album", it ? "Album" : "Albums", "mdi:album"),
                mk("artist", it ? "Artisti" : "Artists", "mdi:account-music"),
                mk("track", it ? "Brani" : "Tracks", "mdi:music-note"),
                mk("radio", "Radio", "mdi:radio"),
            ];
        }
        return [];
    }

    private _popupBack() {
        const prev = this._popupStack[this._popupStack.length - 1];
        if (!prev) return;
        this._popupStack = this._popupStack.slice(0, -1);
        this._popupTitle = prev.title;
        this._popupItems = prev.items;
    }

    private async _playPopupItem(item: any) {
        // Folder with preloaded children → drill in.
        if (item.children) {
            this._popupStack = [...this._popupStack, { title: this._popupTitle, items: this._popupItems }];
            this._popupTitle = this._cleanTitle(item.title);
            this._popupItems = item.children;
            return;
        }
        // Folder to lazy-load → drill in and fetch.
        if (item.load) {
            this._popupStack = [...this._popupStack, { title: this._popupTitle, items: this._popupItems }];
            this._popupTitle = this._cleanTitle(item.title);
            this._popupItems = [];
            this._popupLoading = true;
            try {
                const res: any = await this._hass.callWS({
                    type: "call_service", ...item.load, return_response: true,
                });
                this._popupItems = (res?.response?.items || []).map((x: any) => this._maItem(x));
            } catch (e) {
                console.error("YTMusic: favorites load failed", e);
                this._popupItems = [];
            }
            this._popupLoading = false;
            return;
        }
        // Leaf → play it.
        this._hass.callService("media_player", "play_media", {
            entity_id: this._config.entity_id,
            media_content_id: item.media_content_id,
            media_content_type: item.media_content_type,
        });
        this._popupOpen = false;
    }

    // Resolve the Music Assistant config entry id for an entity. Prefers the entity
    // registry mapping; falls back to querying the config entries so it still works on
    // setups where hass.entities lacks the mapping. Cached per entity.
    private _maConfigEntryIdByEntity: Record<string, string> = {};
    private async _getMAConfigEntryId(entityId: string): Promise<string | null> {
        if (this._maConfigEntryIdByEntity[entityId]) return this._maConfigEntryIdByEntity[entityId];
        const direct = this._hass.entities?.[entityId]?.config_entry_id;
        if (direct) { this._maConfigEntryIdByEntity[entityId] = direct; return direct; }
        try {
            const res: any = await this._hass.callWS({ type: "config_entries/get", domain: "music_assistant" });
            const entries: any[] = Array.isArray(res) ? res : (res?.entries || res?.data || []);
            const entry = entries.find((e: any) => e.domain === "music_assistant") || entries[0];
            const id = entry && (entry.entry_id || entry.entryId || entry.id);
            if (id) { this._maConfigEntryIdByEntity[entityId] = id; return id; }
        } catch (e) {
            console.warn("YTMusic: failed to resolve Music Assistant config entry", e);
        }
        return null;
    }

    private async _doSearch() {
        const q = this._searchQuery.trim();
        if (!q) { this._searchResults = []; return; }
        this._searchLoading = true;
        try {
            if (this._isMA) {
                // Music Assistant native search (music_assistant.search) — richer results
                // grouped by type. config_entry_id is resolved (registry + fallback) so
                // this works on any installation.
                const configEntryId = await this._getMAConfigEntryId(this._config.entity_id);
                if (configEntryId) {
                    const service_data: any = { config_entry_id: configEntryId, name: q, limit: 20 };
                    if (this._searchType) service_data.media_type = [this._searchType];
                    const res: any = await this._hass.callWS({
                        type: "call_service",
                        domain: "music_assistant",
                        service: "search",
                        service_data,
                        return_response: true,
                    });
                    const r = res?.response || {};
                    const typeToGroup: Record<string, string> = {
                        track: "tracks", album: "albums", artist: "artists",
                        playlist: "playlists", radio: "radio",
                    };
                    const groups = this._searchType
                        ? [typeToGroup[this._searchType]]
                        : ["tracks", "artists", "albums", "playlists", "radio"];
                    const items: any[] = [];
                    for (const g of groups) {
                        for (const it of (r[g] || [])) {
                            const artist = it.artists?.[0]?.name;
                            items.push({
                                title: artist ? `${artist} - ${it.name}` : it.name,
                                thumbnail: it.image || "",
                                media_content_id: it.uri,
                                media_content_type: it.media_type,
                            });
                        }
                    }
                    this._searchResults = items;
                } else {
                    // fallback for setups without an entity->config_entry mapping
                    const service_data: any = { entity_id: this._config.entity_id, search_query: q };
                    if (this._searchType) service_data.media_filter_classes = [this._searchType];
                    const res: any = await this._hass.callWS({
                        type: "call_service", domain: "media_player", service: "search_media",
                        service_data, return_response: true,
                    });
                    const r = res?.response?.[this._config.entity_id];
                    this._searchResults = (r?.result || []).filter(
                        (el: any) => !el.media_content_id?.startsWith("MPSP")
                    );
                }
            } else {
                // YouTube Music: ytube_music_player.search action, then browse the results.
                const ytFilter: Record<string, string> = {
                    track: "songs", album: "albums", artist: "artists", playlist: "playlists",
                };
                const data: any = { entity_id: this._config.entity_id, query: q, limit: 40 };
                const f = ytFilter[this._searchType];
                if (f) data.filter = f;
                await this._hass.callService("ytube_music_player", "search", data);
                const r: any = await this._hass.callWS({
                    type: "media_player/browse_media",
                    entity_id: this._config.entity_id,
                    media_content_type: "search",
                    media_content_id: "",
                });
                this._searchResults = (r?.children || []).filter(
                    (el: any) => !el.media_content_id?.startsWith("MPSP")
                );
            }
        } catch (e) {
            console.error("YTMusic: search failed", e);
            this._searchResults = [];
        }
        this._searchLoading = false;
    }

    private _setSearchType(v: string) {
        this._searchType = v;
        if (this._searchQuery.trim()) this._doSearch();
    }

    private _cleanTitle(t: string): string {
        return (t || "").replace(/^(Track|Album|Artist|Playlist|Radio|Video|Brano|Artista|Brani):\s*/i, "");
    }

    private _playSearchItem(item: any) {
        this._hass.callService("media_player", "play_media", {
            entity_id: this._config.entity_id,
            media_content_id: item.media_content_id,
            media_content_type: item.media_content_type,
        });
        // Keep the search open (results stay saved) so more items can be picked;
        // just refresh the queue to reflect the change.
        setTimeout(() => { if (this._showQueue) this._fetchQueue(); }, 1000);
    }

    // --- Enqueue menu (Music Assistant) ---
    private _enqueueOptions(): { key: string; label: string; icon: string; radio?: boolean }[] {
        const it = getUILang() === "it";
        return [
            { key: "play", icon: "mdi:play", label: it ? "Riproduci ora" : "Play now" },
            { key: "next", icon: "mdi:playlist-play", label: it ? "Riproduci dopo" : "Play next" },
            { key: "add", icon: "mdi:playlist-plus", label: it ? "Aggiungi in coda" : "Add to queue" },
            { key: "replace", icon: "mdi:playlist-remove", label: it ? "Riproduci e svuota coda" : "Play now & clear queue" },
            { key: "radio", radio: true, icon: "mdi:radio-tower", label: it ? "Play radio" : "Play radio" },
        ];
    }

    private _openEnqueueMenu(item: any, ev: Event) {
        ev.stopPropagation();
        this._enqueueItem = item;
    }

    private _enqueue(opt: { key: string; radio?: boolean }) {
        const item = this._enqueueItem;
        this._enqueueItem = null;
        if (!item) return;
        const data: any = {
            entity_id: this._config.entity_id,
            media_id: item.media_content_id,
            media_type: item.media_content_type,
        };
        if (opt.radio) data.radio_mode = true; else data.enqueue = opt.key;
        this._hass.callService("music_assistant", "play_media", data);
        // Keep the search/category popup open so more items can be queued in a row;
        // just refresh the queue to reflect the change.
        setTimeout(() => { if (this._showQueue) this._fetchQueue(); }, 1000);
    }

    private _renderEnqueueMenu() {
        return html`
            <div class="chip-popup-backdrop" @click=${() => { this._enqueueItem = null; }}>
                <div class="enq-menu" @click=${(e: Event) => e.stopPropagation()}>
                    <div class="cp-handle"></div>
                    <div class="enq-title">${this._cleanTitle(this._enqueueItem?.title || "")}</div>
                    ${this._enqueueOptions().map((o) => html`
                        <button class="enq-opt" @click=${() => this._enqueue(o)}>
                            <ha-icon icon="${o.icon}"></ha-icon>
                            <span>${o.label}</span>
                        </button>`)}
                </div>
            </div>
        `;
    }

    _renderSearchPopup() {
        const types = _searchTypes();
        return html`
            <div class="chip-popup-backdrop" @click=${() => { this._searchOpen = false; }}>
                <div class="chip-popup" @click=${(e: Event) => e.stopPropagation()}>
                    <div class="cp-handle"></div>
                    <div class="cp-head">
                        <input class="cp-search" type="text" placeholder="${getUILang() === "it" ? "Cerca…" : "Search…"}"
                            .value=${this._searchQuery}
                            @input=${(e: any) => { this._searchQuery = e.target.value; }}
                            @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") this._doSearch(); }} />
                        <button class="icon-btn" @click=${() => this._doSearch()}>
                            <ha-icon icon="mdi:magnify"></ha-icon>
                        </button>
                        <button class="icon-btn" @click=${() => { this._searchOpen = false; }}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    <div class="cp-types" @wheel=${this._onPillsWheel}>
                        ${types.map((t) => html`
                            <button class="fp-chip ${this._searchType === t.value ? "active" : ""}"
                                @click=${() => this._setSearchType(t.value)}>${t.label}</button>`)}
                    </div>
                    ${this._searchLoading
                        ? html`<div class="cp-msg"><ha-icon icon="mdi:loading" class="spin"></ha-icon></div>`
                        : this._searchResults.length
                            ? html`<div class="cp-list">
                                ${this._searchResults.map((it: any) => html`
                                    <div class="cp-item" @click=${() => this._playSearchItem(it)}>
                                        ${it.thumbnail
                                            ? html`<img class="cp-thumb" src="${it.thumbnail}">`
                                            : html`<div class="cp-thumb cp-thumb-ph"><ha-icon icon="mdi:music"></ha-icon></div>`}
                                        <div class="cp-info"><div class="cp-t">${this._cleanTitle(it.title)}</div></div>
                                        ${this._isMA && this._feat("enqueue_menu")
                                            ? html`<button class="cp-more" @click=${(e: Event) => this._openEnqueueMenu(it, e)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>`
                                            : html`<ha-icon icon="mdi:play" class="cp-play"></ha-icon>`}
                                    </div>`)}
                              </div>`
                            : html`<div class="cp-msg">${this._searchQuery
                                ? (getUILang() === "it" ? "Nessun risultato" : "No results")
                                : (getUILang() === "it" ? "Digita per cercare" : "Type to search")}</div>`}
                </div>
            </div>
        `;
    }

    _renderChipPopup() {
        return html`
            <div class="chip-popup-backdrop" @click=${() => { this._popupOpen = false; }}>
                <div class="chip-popup" @click=${(e: Event) => e.stopPropagation()}>
                    <div class="cp-handle"></div>
                    <div class="cp-head">
                        ${this._popupStack.length
                            ? html`<button class="icon-btn" @click=${() => this._popupBack()}>
                                <ha-icon icon="mdi:arrow-left"></ha-icon></button>`
                            : nothing}
                        <span class="cp-title">${this._cleanTitle(this._popupTitle)}</span>
                        <button class="icon-btn" @click=${() => { this._popupOpen = false; }}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    ${this._popupLoading
                        ? html`<div class="cp-msg"><ha-icon icon="mdi:loading" class="spin"></ha-icon></div>`
                        : this._popupItems.length
                            ? (this._popupUsesGrid()
                                ? html`<div class="cp-grid">
                                    ${this._popupItems.map((it: any) => this._renderPopupTile(it))}
                                  </div>`
                                : html`<div class="cp-list">
                                    ${this._popupItems.map((it: any) => this._renderPopupRow(it))}
                                  </div>`)
                            : html`<div class="cp-msg">${getUILang() === "it" ? "Nessun elemento" : "No items"}</div>`}
                </div>
            </div>
        `;
    }

    // Browse popups always use the large cover grid (folders, playlists, albums and
    // tracks alike). Search results keep their own list layout.
    private _popupUsesGrid(): boolean {
        return this._popupItems.length > 0;
    }

    private _renderPopupTile(it: any) {
        const isFolder = !!(it.children || it.load);
        const isTrack = !isFolder && (it.media_content_type ?? "track") === "track";
        return html`
            <div class="cp-tile" @click=${() => this._playPopupItem(it)}>
                <div class="cp-tile-art">
                    ${it.mosaic
                        ? html`<div class="cp-mosaic">${it.mosaic.map((u: string) => html`<img src="${u}">`)}</div>`
                        : (it.thumbnail
                            ? html`<img src="${it.thumbnail}">`
                            : html`<div class="cp-tile-ph"><ha-icon icon="${it.folderIcon || "mdi:music"}"></ha-icon></div>`)}
                    ${isFolder
                        ? nothing
                        : (this._isMA && this._feat("enqueue_menu")
                            ? html`<button class="cp-tile-more" @click=${(e: Event) => this._openEnqueueMenu(it, e)}>
                                <ha-icon icon="mdi:dots-vertical"></ha-icon></button>`
                            : html`<div class="cp-tile-play"><ha-icon icon="mdi:play"></ha-icon></div>`)}
                </div>
                <div class="cp-tile-label ${isTrack ? "" : "bold"}">${this._cleanTitle(it.title)}</div>
            </div>`;
    }

    private _renderPopupRow(it: any) {
        const isFolder = !!(it.children || it.load);
        return html`
            <div class="cp-item" @click=${() => this._playPopupItem(it)}>
                ${it.thumbnail
                    ? html`<img class="cp-thumb" src="${it.thumbnail}">`
                    : html`<div class="cp-thumb cp-thumb-ph"><ha-icon icon="${it.folderIcon || "mdi:music"}"></ha-icon></div>`}
                <div class="cp-info"><div class="cp-t">${this._cleanTitle(it.title)}</div></div>
                ${isFolder
                    ? html`<ha-icon icon="mdi:chevron-right" class="cp-play"></ha-icon>`
                    : (this._isMA && this._feat("enqueue_menu")
                        ? html`<button class="cp-more" @click=${(e: Event) => this._openEnqueueMenu(it, e)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>`
                        : html`<ha-icon icon="mdi:play" class="cp-play"></ha-icon>`)}
            </div>`;
    }

    // --- Players / multi-room (Music Assistant) ---
    private _maPlayers(): any[] {
        const ents = this._hass?.entities || {};
        const sp = this._config.speakers;
        const explicit = Array.isArray(sp) && sp.length > 0;
        const out: any[] = [];
        for (const [id, st] of Object.entries(this._hass?.states || {})) {
            if (!id.startsWith("media_player.")) continue;
            const s: any = st;
            if (s.state === "unavailable" || s.state === "unknown") continue;
            if (explicit) {
                // Whitelist mode: show exactly the configured players.
                if (!sp.includes(id)) continue;
            } else {
                // Auto mode: only Music Assistant players.
                const isMA = ents[id]?.platform === "music_assistant"
                    || s.attributes?.app_id === "music_assistant"
                    || Array.isArray(s.attributes?.group_members);
                if (!isMA) continue;
            }
            out.push({ id, state: s.state, attributes: s.attributes });
        }
        const master = this._config.entity_id;
        out.sort((a, b) => {
            if (a.id === master) return -1;
            if (b.id === master) return 1;
            const ap = a.state === "playing" ? 0 : 1, bp = b.state === "playing" ? 0 : 1;
            if (ap !== bp) return ap - bp;
            return (a.attributes.friendly_name || "") < (b.attributes.friendly_name || "") ? -1 : 1;
        });
        return out;
    }

    private _togglePlayerGroup(p: any, ev: Event) {
        ev.stopPropagation();
        const masterId = this._config.entity_id;
        if (p.id === masterId) return;
        const masterGroup: string[] = this._entity?.attributes?.group_members || [];
        if (masterGroup.includes(p.id)) {
            this._hass.callService("media_player", "unjoin", { entity_id: p.id });
        } else {
            this._hass.callService("media_player", "join", { entity_id: masterId, group_members: [p.id] });
        }
    }

    private _setPlayerVolume(p: any, v: number, ev: Event) {
        ev.stopPropagation();
        this._hass.callService("media_player", "volume_set", { entity_id: p.id, volume_level: v });
    }

    private _renderPlayersPopup() {
        const it = getUILang() === "it";
        const masterId = this._config.entity_id;
        const masterGroup: string[] = this._entity?.attributes?.group_members || [];
        const players = this._maPlayers();
        return html`
            <div class="chip-popup-backdrop" @click=${() => { this._playersOpen = false; this._transferMode = false; }}>
                <div class="chip-popup" @click=${(e: Event) => e.stopPropagation()}>
                    <div class="cp-handle"></div>
                    <div class="cp-head">
                        <span class="cp-title">${this._transferMode
                            ? (it ? "Trasferisci la coda a…" : "Transfer queue to…")
                            : (it ? "Casse" : "Players")}</span>
                        <button class="icon-btn" @click=${() => { this._playersOpen = false; this._transferMode = false; }}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    <div class="cp-list">
                        ${players.map((p) => {
                            const isMaster = p.id === masterId;
                            const grouped = isMaster || masterGroup.includes(p.id);
                            const playing = p.state === "playing";
                            const vol = typeof p.attributes.volume_level === "number" ? p.attributes.volume_level : 0;
                            return html`
                                <div class="pl-row ${grouped ? "grouped" : ""} ${this._transferMode && !isMaster ? "pickable" : ""}"
                                    @click=${() => { if (this._transferMode && !isMaster) this._transferQueueTo(p.id); }}>
                                    <ha-icon class="pl-ico" icon="${playing ? "mdi:speaker-play" : "mdi:speaker"}"></ha-icon>
                                    <div class="pl-info">
                                        <div class="pl-name">${p.attributes.friendly_name || p.id}</div>
                                        <div class="pl-vol">
                                            <ha-icon icon="mdi:volume-medium"></ha-icon>
                                            <input type="range" min="0" max="1" step="0.01" .value=${String(vol)}
                                                @change=${(e: any) => this._setPlayerVolume(p, parseFloat(e.target.value), e)}
                                                @click=${(e: Event) => e.stopPropagation()} />
                                        </div>
                                    </div>
                                    ${this._transferMode
                                        ? (isMaster
                                            ? html`<span class="pl-master">${it ? "Principale" : "Main"}</span>`
                                            : html`<ha-icon class="pl-arrow" icon="mdi:arrow-right-bold-circle"></ha-icon>`)
                                        : (isMaster
                                            ? html`<span class="pl-master">${it ? "Principale" : "Main"}</span>`
                                            : html`<button class="pl-group ${grouped ? "on" : ""}"
                                                title=${grouped ? (it ? "Sgancia" : "Ungroup") : (it ? "Raggruppa" : "Group")}
                                                @click=${(e: Event) => this._togglePlayerGroup(p, e)}>
                                                <ha-icon icon="${grouped ? "mdi:link-variant" : "mdi:link-variant-plus"}"></ha-icon>
                                            </button>`)}
                                </div>`;
                        })}
                        ${players.length === 0 ? html`<div class="cp-msg">${it ? "Nessuna cassa" : "No players"}</div>` : nothing}
                    </div>
                </div>
            </div>
        `;
    }

    // --- Queue options menu (clear / transfer for MA, turn off for YT) ---
    private _clearQueue() {
        this._queueMenuOpen = false;
        this._hass.callService("media_player", "clear_playlist", { entity_id: this._config.entity_id });
        setTimeout(() => { if (this._showQueue) this._fetchQueue(); }, 600);
    }

    private _startTransfer() {
        this._queueMenuOpen = false;
        this._transferMode = true;
        this._playersOpen = true;
    }

    private _transferQueueTo(targetId: string) {
        this._transferMode = false;
        this._playersOpen = false;
        this._hass.callService("music_assistant", "transfer_queue", {
            entity_id: targetId,
            source_player: this._config.entity_id,
        });
    }

    private _turnOff() {
        this._queueMenuOpen = false;
        this._hass.callService("media_player", "turn_off", { entity_id: this._config.entity_id });
    }

    private _renderQueueMenu() {
        const it = getUILang() === "it";
        return html`
            <div class="chip-popup-backdrop" @click=${() => { this._queueMenuOpen = false; }}>
                <div class="enq-menu" @click=${(e: Event) => e.stopPropagation()}>
                    <div class="cp-handle"></div>
                    ${this._isMA
                        ? html`
                            <button class="enq-opt" @click=${() => this._startTransfer()}>
                                <ha-icon icon="mdi:swap-horizontal"></ha-icon>
                                <span>${it ? "Trasferisci la coda a un'altra cassa" : "Transfer queue to another player"}</span>
                            </button>
                            <button class="enq-opt" @click=${() => this._clearQueue()}>
                                <ha-icon icon="mdi:playlist-remove"></ha-icon>
                                <span>${it ? "Svuota la coda" : "Clear the queue"}</span>
                            </button>`
                        : html`
                            <button class="enq-opt" @click=${() => this._turnOff()}>
                                <ha-icon icon="mdi:power"></ha-icon>
                                <span>${it ? "Spegni" : "Turn off"}</span>
                            </button>`}
                </div>
            </div>
        `;
    }

    private _onPillsWheel(e: WheelEvent) {
        if (e.deltaY === 0) return;
        e.preventDefault();
        (e.currentTarget as HTMLElement).scrollLeft += e.deltaY;
    }

    render() {
        return html`
            <ha-card>
                ${this._renderFullPlayer()}
                ${this._popupOpen ? this._renderChipPopup() : nothing}
                ${this._searchOpen ? this._renderSearchPopup() : nothing}
                ${this._enqueueItem ? this._renderEnqueueMenu() : nothing}
                ${this._playersOpen ? this._renderPlayersPopup() : nothing}
                ${this._queueMenuOpen ? this._renderQueueMenu() : nothing}
            </ha-card>
        `;
    }

    _renderHeader() {
        return html`
            <div class="yt-header">
                <div class="yt-logo">
                    ${YTLogoSVG}
                    <span class="yt-title">Music</span>
                </div>
                <div class="header-actions">
                    <button class="icon-btn" @click=${() => { this._searchActive = true; }}>
                        <ha-icon icon="mdi:magnify"></ha-icon>
                    </button>
                    ${this._renderSourceSelector("header")}
                </div>
            </div>
        `;
    }

    _renderSearchHeader() {
        return html`
            <div class="yt-header search-mode">
                <button class="icon-btn" @click=${() => { this._searchActive = false; }}>
                    <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>
                <input
                    type="search"
                    class="search-input"
                    id="searchInput"
                    placeholder="${YT_SEARCH_PLACEHOLDER[getUILang()]}"
                    @keyup=${this._handleSearchKey}
                    autofocus
                />
            </div>
        `;
    }

    _renderSourceSelector(menuId = "header") {
        if (!this._hass) return html``;

        let media_players = [];
        for (const [key, value] of Object.entries(this._hass["states"])) {
            if (key.startsWith("media_player")) {
                if ((value as any)?.attributes?.remote_player_id) continue;
                const sp = this._config.speakers;
                if (Array.isArray(sp) && sp.length && !sp.includes(key)) continue;
                media_players.push([key, value["attributes"]["friendly_name"]]);
            }
        }
        media_players.sort((a, b) => a[1] < b[1] ? -1 : 1);

        return html`
            <div class="source-wrap">
                <button class="icon-btn cast-btn" @click=${(e: Event) => {
                    if (this._isMA && this._feat("players")) { e.stopPropagation(); this._playersOpen = true; }
                    else { this._toggleMenu(e, menuId); }
                }}>
                    ${CastAudioIcon}
                </button>
                ${this._menuOpen === menuId ? html`
                    <div
                        class="source-menu"
                        @click=${(e: Event) => e.stopPropagation()}
                        @wheel=${this._onSourceMenuWheel}
                    >
                        ${media_players.map(item => html`
                            <div
                                class="menu-item ${item[0] === this._entity?.attributes?.remote_player_id ? "selected" : ""}"
                                @click=${() => this._selectSource(item[0])}
                            >${item[1]}</div>
                        `)}
                    </div>
                ` : nothing}
            </div>
        `;
    }

    _renderMiniPlayer() {
        const art = this._entity?.attributes?.entity_picture_local
            || this._entity?.attributes?.entity_picture;
        const title = this._entity?.attributes?.media_title || "Sconosciuto";
        const artist = this._entity?.attributes?.media_artist || "";
        const isPlaying = this._entity?.state === "playing";
        const progress = this._getProgress();

        return html`
            <div class="mini-player" @click=${() => { this._playerExpanded = true; }}>
                <div class="mini-progress-bar">
                    <div class="mini-progress-fill" style="width: ${progress}%"></div>
                </div>
                ${art
                    ? html`<img class="mini-art" src="${art}">`
                    : html`<div class="mini-art-ph"><ha-icon icon="mdi:music"></ha-icon></div>`}
                <div class="mini-info">
                    <div class="mini-title">${title}</div>
                    ${artist ? html`<div class="mini-artist">${artist}</div>` : nothing}
                </div>
                <button class="mini-btn" @click=${(e: Event) => { e.stopPropagation(); this._togglePlayPause(); }}>
                    ${isPlaying ? PauseIcon : PlayIcon}
                </button>
                <button class="mini-btn" @click=${(e: Event) => { e.stopPropagation(); this._skipNext(); }}>
                    ${SkipNextIcon}
                </button>
            </div>
        `;
    }

    _renderFullPlayer() {
        const art = this._entity?.attributes?.entity_picture_local
            || this._entity?.attributes?.entity_picture;
        const title = this._entity?.attributes?.media_title || "Sconosciuto";
        const artist = this._entity?.attributes?.media_artist || "";
        const playing = this._entity?.state === "playing";
        const animate = playing && this._feat("cover_animation");
        const glow = playing && this._feat("cover_glow");
        const animS = this._config.anim_speed ?? 6;
        const glowPct = this._config.glow_size ?? 100;
        const styleVars = `--fp-anim:${animS}s; --fp-hue:${animS * 2}s; --fp-glow-size:${glowPct}%;`
            + (art ? ` --fp-bg: url('${art}');` : "");

        return html`
            <div class="full-player" style="${styleVars}">
                <div class="fp-bg-blur"></div>
                <div class="fp-content">
                    <div class="fp-header">
                        <span class="fp-logo">${YTLogoSVG}<b>Music</b></span>
                        <span class="fp-from">${_t("nowPlaying")}</span>
                        ${this._feat("show_search") ? html`
                        <button class="icon-btn" @click=${() => { this._searchOpen = true; }}>
                            <ha-icon icon="mdi:magnify"></ha-icon>
                        </button>` : nothing}
                        ${this._renderSourceSelector("full-player")}
                    </div>
                    <div class="fp-tabs">
                        <button class="fp-tab ${!this._showQueue ? "active" : ""}"
                            @click=${() => { this._showQueue = false; }}>
                            ${_t("tabPlay")}
                        </button>
                        ${this._feat("show_queue") ? html`
                        <button class="fp-tab ${this._showQueue ? "active" : ""}"
                            @click=${() => { this._showQueue = true; this._fetchQueue(); }}>
                            ${_t("queue")}
                        </button>` : nothing}
                        <button class="fp-tab-opts" title="${getUILang() === "it" ? "Opzioni coda" : "Queue options"}"
                            @click=${() => { this._queueMenuOpen = true; }}>
                            <ha-icon icon="mdi:dots-vertical"></ha-icon>
                        </button>
                    </div>
                    ${this._feat("show_chips") ? html`
                    <div class="fp-chips" @wheel=${this._onPillsWheel}>
                        ${this._categories.map((c, i) => html`
                            <button class="fp-chip ${this._activeFilter === i ? "active" : ""}"
                                @click=${() => this._openChipPopup(c, i)}
                            >${c.label}</button>`)}
                    </div>` : nothing}
                    ${this._showQueue ? this._renderQueue() : html`
                        <div class="fp-art-wrap">
                            <div class="fp-glow ${glow ? "on" : ""}"></div>
                            ${art
                                ? html`<img class="fp-art ${animate ? "playing" : ""}" src="${art}">`
                                : html`<div class="fp-art-ph ${animate ? "playing" : ""}"><ha-icon icon="mdi:music-note" style="--mdc-icon-size:80px"></ha-icon></div>`}
                        </div>
                        <div class="fp-info">
                            <div>
                                <div class="fp-title">${title}</div>
                                <div class="fp-artist">${artist}</div>
                            </div>
                        </div>
                        <ytmusic-media-control
                            .hass=${this._hass}
                            .entity=${this._entity}
                            @ytmusic-queue-options=${() => { this._queueMenuOpen = true; }}
                        ></ytmusic-media-control>
                    `}
                </div>
            </div>
        `;
    }

    async _fetchQueue() {
        if (!this._entity || this._entity.state === "off") return;
        this._queueLoading = true;
        this._queueTracks = [];

        if (this._isMA) {
            // Music Assistant: the full queue is only available through the companion
            // integration "Music Assistant Queue Actions" (mass_queue). If installed it
            // returns every item; otherwise we fall back to current + next via
            // music_assistant.get_queue.
            try {
                const res: any = await this._hass.callWS({
                    type: "call_service",
                    domain: "mass_queue",
                    service: "get_queue_items",
                    // Window around the current item: a little history + everything upcoming,
                    // so the playing track stays near the top instead of after the whole history.
                    service_data: { entity: this._config.entity_id, limit_before: 3, limit_after: 400 },
                    return_response: true,
                });
                const list: any[] = res?.response?.[this._config.entity_id] || [];
                const curId = this._entity?.attributes?.media_content_id;
                this._queueCurrentIndex = list.findIndex((it) => it.media_content_id === curId);
                this._queueTracks = list.map((it: any) => ({
                    title: it.media_artist ? `${it.media_artist} - ${it.media_title}` : it.media_title,
                    thumbnail: it.local_image_encoded || it.media_image || "",
                    queue_item_id: it.queue_item_id,
                }));
            } catch (e) {
                // mass_queue not installed → degrade gracefully to current + next.
                try {
                    const res: any = await this._hass.callWS({
                        type: "call_service",
                        domain: "music_assistant",
                        service: "get_queue",
                        target: { entity_id: this._config.entity_id },
                        return_response: true,
                    });
                    const q = res?.response?.[this._config.entity_id];
                    const items = [q?.current_item, q?.next_item].filter(Boolean);
                    this._queueCurrentIndex = q?.current_item ? 0 : -1;
                    this._queueTracks = items.map((it: any) => {
                        const mi = it.media_item || {};
                        const artist = mi.artists?.[0]?.name || "";
                        const name = mi.name || it.name || "";
                        return {
                            title: artist ? `${artist} - ${name}` : name,
                            thumbnail: mi.image || "",
                        };
                    });
                } catch (e2) {
                    console.error("[MA queue] no queue source available", e2);
                    this._queueTracks = [];
                }
            }
            this._queueLoading = false;
            return;
        }

        // YouTube Music (ytube_music_player)
        try {
            const r: any = await this._hass.callWS({
                type: "media_player/browse_media",
                entity_id: this._config.entity_id,
                media_content_type: "cur_playlists",
                media_content_id: "",
            });
            this._queueTracks = (r && r.children) ? r.children : [];
        } catch (e) {
            this._queueTracks = [];
        }
        this._queueLoading = false;
    }

    private _queueItemClick(i: number) {
        if (this._isMA) {
            // Jump to the tapped queue item (requires the mass_queue integration).
            const qid = this._queueTracks?.[i]?.queue_item_id;
            if (qid === undefined) return; // fallback source (current+next) is view-only
            this._hass.callService("mass_queue", "play_queue_item", {
                entity: this._config.entity_id,
                queue_item_id: qid,
            });
            // Optimistically highlight the tapped track, then re-sync once MA switches.
            this._queueCurrentIndex = i;
            this.requestUpdate();
            setTimeout(() => this._fetchQueue(), 1000);
            return;
        }
        this._hass.callService("ytube_music_player", "call_method", {
            entity_id: this._config.entity_id,
            command: "goto_track",
            parameters: i + 1,
        });
    }

    // --- Music Assistant queue management (requires the mass_queue integration) ---
    private async _maQueueAction(service: string, qid: string, ev: Event) {
        ev.stopPropagation();
        if (!qid) return;
        try {
            await this._hass.callService("mass_queue", service, {
                entity: this._config.entity_id,
                queue_item_id: qid,
            });
        } catch (e) {
            console.error(`YTMusic: mass_queue.${service} failed`, e);
        }
        // Refresh the queue to reflect the change.
        setTimeout(() => this._fetchQueue(), 300);
    }

    _renderQueue() {
        const currentTrack = this._isMA
            ? this._queueCurrentIndex
            : (this._entity?.attributes?.current_track !== undefined
                ? this._entity.attributes.current_track : -1);

        if (this._queueLoading) return html`
            <div class="fp-queue-loading">
                <ha-icon icon="mdi:loading" class="spin"></ha-icon>
            </div>`;

        if (!this._queueTracks || !this._queueTracks.length) return html`
            <div class="fp-queue-empty">${_t("noQueue")}</div>`;

        return html`
            <div class="fp-queue-list">
                ${this._queueTracks.map((track: any, i: number) => {
                    const rawTitle = track.title || "";
                    const dashIdx = rawTitle.indexOf(" - ");
                    const artist = dashIdx > 0 ? rawTitle.substring(0, dashIdx) : "";
                    const title = dashIdx > 0 ? rawTitle.substring(dashIdx + 3) : rawTitle;
                    const thumb = track.thumbnail || "";
                    const isCurrent = i === currentTrack;
                    // Queue management is available for Music Assistant items that come
                    // after the current one (and require a queue_item_id).
                    const qid = track.queue_item_id;
                    const showActions = this._isMA && this._feat("queue_actions") && qid !== undefined
                        && currentTrack >= 0 && i > currentTrack;
                    const canMoveUp = i > currentTrack + 1;
                    return html`
                        <div class="fp-queue-item ${isCurrent ? "current" : ""}"
                            @click=${() => this._queueItemClick(i)}>
                            ${thumb
                                ? html`<img class="fp-qi-thumb" src="${thumb}">`
                                : html`<div class="fp-qi-thumb-ph"><ha-icon icon="mdi:music"></ha-icon></div>`}
                            <div class="fp-qi-info">
                                <div class="fp-qi-title">${title}</div>
                                ${artist ? html`<div class="fp-qi-artist">${artist}</div>` : nothing}
                            </div>
                            ${isCurrent ? html`<ha-icon icon="mdi:volume-high" class="fp-qi-playing"></ha-icon>` : nothing}
                            ${showActions ? html`
                                <div class="fp-qi-actions" @click=${(e: Event) => e.stopPropagation()}>
                                    <button class="fp-qi-act" title="Riproduci dopo"
                                        @click=${(e: Event) => this._maQueueAction("move_queue_item_next", qid, e)}>
                                        <ha-icon icon="mdi:playlist-play"></ha-icon></button>
                                    ${canMoveUp ? html`
                                    <button class="fp-qi-act" title="Su"
                                        @click=${(e: Event) => this._maQueueAction("move_queue_item_up", qid, e)}>
                                        <ha-icon icon="mdi:arrow-up"></ha-icon></button>` : nothing}
                                    <button class="fp-qi-act" title="Giù"
                                        @click=${(e: Event) => this._maQueueAction("move_queue_item_down", qid, e)}>
                                        <ha-icon icon="mdi:arrow-down"></ha-icon></button>
                                    <button class="fp-qi-act" title="Rimuovi"
                                        @click=${(e: Event) => this._maQueueAction("remove_queue_item", qid, e)}>
                                        <ha-icon icon="mdi:close"></ha-icon></button>
                                </div>` : nothing}
                        </div>
                    `;
                })}
            </div>
        `;
    }

    _selectFilter(index: number, _filter: any) {
        this._activeFilter = index;
        if (this._rootItems.length > 0) {
            this._navigateToFilter(index);
        } else {
            this._rootLoaded = false;
            this._loadRoot();
        }
    }

    _handleSearchKey(ev: KeyboardEvent) {
        if (ev.keyCode === 13) {
            const input = this.renderRoot.querySelector("#searchInput") as HTMLInputElement;
            if (input?.value && this._browser) {
                this._browser.searchExternal(input.value);
                this._searchActive = false;
            }
        }
    }

    _getProgress() {
        const duration = this._entity?.attributes?.media_duration;
        const position = this._entity?.attributes?.media_position;
        if (!duration || position == null) return 0;
        return Math.min((position / duration) * 100, 100);
    }

    _toggleMenu(e: Event, menuId = "header") {
        e.stopPropagation();
        this._menuOpen = this._menuOpen === menuId ? null : menuId;
        if (this._menuOpen) {
            document.addEventListener("click", () => { this._menuOpen = null; }, { once: true });
        }
    }

    _onSourceMenuWheel(e: WheelEvent) {
        e.stopPropagation();
        e.preventDefault();
        (e.currentTarget as HTMLElement).scrollTop += e.deltaY;
    }

    async _selectSource(source: string) {
        const currentSource = this._entity?.attributes?.remote_player_id;
        this._menuOpen = null;
        if (source === "" || source === currentSource) return;
        this._hass.callService("media_player", "select_source", {
            entity_id: this._config.entity_id,
            source: source,
        });
    }

    async _togglePlayPause() {
        this._hass.callService("media_player", "media_play_pause", {
            entity_id: this._config.entity_id,
        });
    }

    async _skipNext() {
        this._hass.callService("media_player", "media_next_track", {
            entity_id: this._config.entity_id,
        });
    }

    static get styles(): CSSResultGroup {
        return [css`
            :host {
                --yt-bg: #0f0f0f;
                --yt-surface: #1e1e1e;
                --yt-surface2: #282828;
                --yt-red: #ff0000;
                --yt-text: #ffffff;
                --yt-text2: rgba(255,255,255,0.6);
                --yt-text3: rgba(255,255,255,0.38);
                --yt-pill-bg: rgba(255,255,255,0.08);
                --yt-pill-border: rgba(255,255,255,0.15);
            }

            ha-card {
                background: var(--yt-bg) !important;
                height: 700px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                position: relative;
                border-radius: 12px;
                color: var(--yt-text);
            }

            /* ── HEADER ── */
            .yt-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px 8px;
                flex-shrink: 0;
                height: 52px;
            }

            .yt-logo {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .yt-icon {
                width: 28px;
                height: 28px;
            }

            .yt-title {
                font-size: 18px;
                font-weight: 600;
                color: var(--yt-text);
                letter-spacing: 0.3px;
            }

            .header-actions {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .yt-header.search-mode {
                gap: 8px;
                padding: 8px 16px;
            }

            .search-input {
                flex: 1;
                background: var(--yt-surface);
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 24px;
                color: var(--yt-text);
                font-size: 15px;
                padding: 8px 16px;
                outline: none;
                height: 36px;
            }

            .search-input::placeholder { color: var(--yt-text3); }

            /* ── FILTER PILLS ── */
            .pills-container {
                padding: 0 16px 10px;
                flex-shrink: 0;
                overflow-x: auto;
                overflow-y: hidden;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }
            .pills-container::-webkit-scrollbar { display: none; }

            .pills-row {
                display: flex;
                gap: 8px;
                padding-bottom: 2px;
            }

            .pill {
                flex-shrink: 0;
                background: var(--yt-pill-bg);
                border: 1px solid var(--yt-pill-border);
                border-radius: 20px;
                color: var(--yt-text);
                font-size: 13px;
                font-weight: 500;
                padding: 6px 14px;
                cursor: pointer;
                white-space: nowrap;
                transition: background 0.15s, border-color 0.15s;
            }

            .pill:hover {
                background: rgba(255,255,255,0.14);
            }

            .pill.active {
                background: var(--yt-text);
                border-color: var(--yt-text);
                color: var(--yt-bg);
            }

            /* ── CONTENT ── */
            .content-area {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            ytmusic-browser {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                --primary-text-color: #ffffff;
                --rgb-primary-text-color: 255, 255, 255;
                --primary-color: #ff0000;
                --rgb-primary-color: 255, 0, 0;
                color: #ffffff;
            }

            /* ── MINI PLAYER ── */
            .mini-player {
                position: relative;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 12px;
                background: var(--yt-surface);
                border-top: 1px solid rgba(255,255,255,0.06);
                cursor: pointer;
                flex-shrink: 0;
                height: 62px;
            }

            .mini-player:hover { background: var(--yt-surface2); }

            .mini-progress-bar {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: rgba(255,255,255,0.15);
            }

            .mini-progress-fill {
                height: 100%;
                background: var(--yt-red);
                transition: width 1s linear;
            }

            .mini-art {
                width: 44px;
                height: 44px;
                border-radius: 4px;
                object-fit: cover;
                flex-shrink: 0;
            }

            .mini-art-ph {
                width: 44px;
                height: 44px;
                border-radius: 4px;
                background: var(--yt-surface2);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                color: var(--yt-text2);
            }

            .mini-info {
                flex: 1;
                min-width: 0;
            }

            .mini-title {
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: var(--yt-text);
            }

            .mini-artist {
                font-size: 12px;
                color: var(--yt-text2);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .mini-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                color: var(--yt-text);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .mini-btn:hover { background: rgba(255,255,255,0.08); }

            .mini-btn svg {
                width: 22px;
                height: 22px;
                fill: currentColor;
            }

            /* ── FULL PLAYER ── */
            .full-player {
                position: absolute;
                inset: 0;
                z-index: 200;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            .fp-bg-blur {
                position: absolute;
                inset: 0;
                background-color: #0a0a0a;
                background-image: var(--fp-bg);
                background-size: cover;
                background-position: center;
                filter: blur(40px) brightness(0.25) saturate(1.6);
                transform: scale(1.1);
                z-index: 0;
            }

            .fp-content {
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 0 20px 16px;
            }

            .fp-header {
                display: flex;
                align-items: center;
                padding: 12px 0 8px;
                gap: 8px;
            }

            .fp-from {
                flex: 1;
                text-align: center;
                font-size: 12px;
                font-weight: 600;
                color: var(--yt-text2);
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .fp-art-wrap {
                flex: 1;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px 0;
                min-height: 0;
            }

            /* animated colored halo behind the cover */
            .fp-glow {
                position: absolute;
                width: min(var(--fp-glow-size, 100%), 130vw);
                aspect-ratio: 1 / 1;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,0,0,0.85) 0%, rgba(255,0,0,0.5) 40%, rgba(255,0,0,0.15) 62%, rgba(255,0,0,0) 78%);
                filter: blur(30px);
                z-index: 0;
                opacity: 0;
                transition: opacity 0.5s ease;
                pointer-events: none;
            }
            .fp-glow.on {
                opacity: 1;
                animation: fp-glow-pulse var(--fp-anim, 6s) ease-in-out infinite,
                           fp-glow-hue var(--fp-hue, 12s) linear infinite;
            }
            @keyframes fp-glow-pulse {
                0%, 100% { transform: scale(0.82); }
                50%      { transform: scale(1.35); }
            }
            @keyframes fp-glow-hue {
                from { filter: blur(30px) hue-rotate(0deg); }
                to   { filter: blur(30px) hue-rotate(360deg); }
            }

            .fp-art {
                position: relative;
                z-index: 1;
                max-width: 100%;
                max-height: 100%;
                border-radius: 50%;
                box-shadow: 0 8px 40px rgba(0,0,0,0.6);
                aspect-ratio: 1/1;
                object-fit: cover;
            }

            .fp-art-ph {
                position: relative;
                z-index: 1;
                width: 240px;
                height: 240px;
                border-radius: 50%;
                background: var(--yt-surface);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text2);
            }

            /* undulating "breathing" cover while playing — stays round, never square */
            .fp-art.playing,
            .fp-art-ph.playing {
                animation: fp-ondula var(--fp-anim, 6s) ease-in-out infinite;
            }
            @keyframes fp-ondula {
                0%   { border-radius: 50%; transform: translateY(0) rotate(0deg) scale(1); }
                25%  { border-radius: 40% 60% 55% 45% / 52% 42% 58% 48%; transform: translateY(-11px) rotate(-2.6deg) scale(1.05); }
                50%  { border-radius: 60% 40% 46% 54% / 58% 50% 50% 42%; transform: translateY(8px) rotate(2.2deg) scale(0.94); }
                75%  { border-radius: 46% 54% 60% 40% / 44% 58% 42% 56%; transform: translateY(-6px) rotate(1.8deg) scale(1.03); }
                100% { border-radius: 50%; transform: translateY(0) rotate(0deg) scale(1); }
            }

            .fp-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 0 4px;
                flex-shrink: 0;
            }

            .fp-title {
                font-size: 20px;
                font-weight: 700;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .fp-artist {
                font-size: 14px;
                color: var(--yt-text2);
                margin-top: 2px;
            }

            /* ── FULL PLAYER TABS ── */
            .fp-tabs {
                display: flex;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                flex-shrink: 0;
                margin: 4px -20px 0;
                padding: 0 20px;
            }

            /* quick-access category chips inside the player */
            .fp-chips {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                flex-shrink: 0;
                margin: 0 -20px;
                padding: 10px 20px 2px;
                scrollbar-width: none;
            }
            .fp-chips::-webkit-scrollbar { display: none; }
            .fp-chip {
                flex: 0 0 auto;
                padding: 6px 14px;
                border-radius: 16px;
                background: #1f1f1f;
                border: 1px solid #333;
                color: var(--yt-text, #ddd);
                font-size: 12px;
                font-weight: 600;
                white-space: nowrap;
                cursor: pointer;
            }
            .fp-chip.active {
                background: #fff;
                color: #0f0f0f;
                border-color: #fff;
            }

            .fp-logo {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-size: 14px;
                color: var(--yt-text);
            }
            .fp-logo svg { width: 20px; height: 20px; }

            /* chip category popup — semi-transparent bottom sheet, player visible behind */
            .chip-popup-backdrop {
                position: absolute;
                inset: 0;
                z-index: 300;
                background: rgba(0, 0, 0, 0.35);
                display: flex;
                align-items: flex-end;
                animation: cp-fade 0.15s ease;
            }
            @keyframes cp-fade { from { opacity: 0; } to { opacity: 1; } }
            .chip-popup, .chip-popup * { box-sizing: border-box; }
            .chip-popup {
                width: 100%;
                height: 70%;
                max-width: 100%;
                background: rgba(20, 20, 20, 0.9);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                border-radius: 20px 20px 0 0;
                border-top: 1px solid rgba(255,255,255,0.12);
                padding: 10px 14px 18px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 -12px 40px rgba(0,0,0,0.55);
                animation: cp-slide 0.2s ease;
            }
            .cp-handle {
                width: 42px;
                height: 4px;
                border-radius: 2px;
                background: rgba(255,255,255,0.3);
                margin: 2px auto 10px;
                flex-shrink: 0;
            }
            @keyframes cp-slide { from { transform: translateY(30px); } to { transform: translateY(0); } }
            .cp-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                margin-bottom: 8px;
                flex-shrink: 0;
            }
            .cp-title { font-size: 16px; font-weight: 700; color: var(--yt-text); }
            .cp-list { flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: none; }
            .cp-list::-webkit-scrollbar { width: 0; display: none; }
            .cp-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 8px 8px;
                border-radius: 8px;
                cursor: pointer;
            }
            .cp-play { margin-right: 2px; }
            .cp-item:hover { background: rgba(255,255,255,0.06); }
            .cp-thumb {
                width: 46px;
                height: 46px;
                border-radius: 6px;
                object-fit: cover;
                flex-shrink: 0;
            }
            .cp-thumb-ph {
                background: var(--yt-surface);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text2);
            }
            .cp-info { flex: 1; min-width: 0; }
            .cp-t {
                font-size: 13px;
                font-weight: 600;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .cp-play { color: var(--yt-red, #ff0000); flex-shrink: 0; }
            .cp-more {
                background: none;
                border: none;
                color: var(--yt-text2);
                cursor: pointer;
                flex-shrink: 0;
                padding: 4px;
                border-radius: 50%;
                display: flex;
                --mdc-icon-size: 20px;
            }
            .cp-more:hover { color: #fff; background: rgba(255,255,255,0.1); }

            .cp-grid {
                flex: 1;
                overflow-y: auto;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 14px 12px;
                padding: 4px 2px 8px;
                align-content: start;
                scrollbar-width: none;
            }
            .cp-grid::-webkit-scrollbar { display: none; }
            .cp-tile { cursor: pointer; }
            .cp-tile-art {
                position: relative;
                width: 100%;
                aspect-ratio: 1 / 1;
                border-radius: 12px;
                overflow: hidden;
                background: rgba(255,255,255,0.06);
            }
            .cp-tile-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
            .cp-mosaic {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                width: 100%; height: 100%;
            }
            .cp-mosaic img { width: 100%; height: 100%; object-fit: cover; display: block; }
            .cp-tile-ph {
                width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                color: var(--yt-text2); --mdc-icon-size: 40px;
            }
            .cp-tile-more {
                position: absolute; top: 6px; right: 6px;
                width: 30px; height: 30px;
                border: none; border-radius: 50%;
                background: rgba(0,0,0,0.55);
                color: #fff; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                --mdc-icon-size: 18px;
            }
            .cp-tile-play {
                position: absolute; bottom: 6px; right: 6px;
                width: 34px; height: 34px; border-radius: 50%;
                background: var(--yt-red, #ff0000); color: #fff;
                display: flex; align-items: center; justify-content: center;
                --mdc-icon-size: 20px;
                opacity: 0; transition: opacity 0.15s;
            }
            .cp-tile:hover .cp-tile-play { opacity: 1; }
            .cp-tile-label {
                margin-top: 6px;
                font-size: 12.5px;
                color: var(--yt-text);
                line-height: 1.25;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .cp-tile-label.bold { font-weight: 600; }
            .enq-menu {
                width: 100%;
                max-width: 100%;
                background: rgba(28, 28, 28, 0.96);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                border-radius: 20px 20px 0 0;
                border-top: 1px solid rgba(255,255,255,0.12);
                padding: 10px 10px 20px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 -12px 40px rgba(0,0,0,0.6);
                animation: cp-slide 0.2s ease;
            }
            .enq-title {
                font-size: 14px;
                font-weight: 700;
                color: var(--yt-text);
                padding: 4px 10px 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border-bottom: 1px solid rgba(255,255,255,0.08);
                margin-bottom: 4px;
            }
            .enq-opt {
                display: flex;
                align-items: center;
                gap: 14px;
                width: 100%;
                background: none;
                border: none;
                color: var(--yt-text);
                cursor: pointer;
                padding: 13px 12px;
                border-radius: 10px;
                font-size: 14px;
                text-align: left;
                --mdc-icon-size: 22px;
            }
            .enq-opt ha-icon { color: var(--yt-text2); flex-shrink: 0; }
            .enq-opt:hover { background: rgba(255,255,255,0.08); }
            .enq-opt:hover ha-icon { color: var(--yt-red, #ff0000); }

            .pl-row {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 6px;
                border-radius: 12px;
            }
            .pl-row.grouped { background: rgba(255,0,0,0.10); }
            .pl-ico { color: var(--yt-text2); flex-shrink: 0; --mdc-icon-size: 26px; }
            .pl-row.grouped .pl-ico { color: var(--yt-red, #ff0000); }
            .pl-info { flex: 1; min-width: 0; }
            .pl-name {
                font-size: 14px;
                font-weight: 600;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .pl-vol {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 4px;
                --mdc-icon-size: 16px;
                color: var(--yt-text2);
            }
            .pl-vol input[type="range"] {
                flex: 1;
                height: 4px;
                -webkit-appearance: none;
                appearance: none;
                background: rgba(255,255,255,0.2);
                border-radius: 2px;
                accent-color: var(--yt-red, #ff0000);
                cursor: pointer;
            }
            .pl-group {
                background: rgba(255,255,255,0.08);
                border: none;
                color: var(--yt-text2);
                cursor: pointer;
                flex-shrink: 0;
                width: 38px;
                height: 38px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                --mdc-icon-size: 20px;
            }
            .pl-group.on { background: rgba(255,0,0,0.2); color: var(--yt-red, #ff0000); }
            .pl-group:hover { color: #fff; }
            .pl-row.pickable { cursor: pointer; }
            .pl-row.pickable:hover { background: rgba(255,255,255,0.06); }
            .pl-arrow { color: var(--yt-red, #ff0000); flex-shrink: 0; --mdc-icon-size: 26px; }
            .pl-master {
                flex-shrink: 0;
                font-size: 11px;
                font-weight: 700;
                color: var(--yt-red, #ff0000);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                padding-right: 6px;
            }
            .cp-msg {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 34px;
                text-align: center;
                color: var(--yt-text2);
            }
            .cp-search {
                flex: 1;
                min-width: 0;
                background: rgba(255,255,255,0.08);
                border: none;
                border-radius: 10px;
                padding: 9px 12px;
                color: var(--yt-text);
                font-size: 14px;
                outline: none;
            }
            .cp-types {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                justify-content: safe center;
                padding: 6px 8px 10px;
                flex-shrink: 0;
                scrollbar-width: none;
            }
            .cp-types::-webkit-scrollbar { display: none; }

            .fp-tab {
                background: none;
                border: none;
                color: var(--yt-text2);
                font-size: 14px;
                font-weight: 600;
                padding: 10px 18px;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                margin-bottom: -1px;
                transition: color 0.15s;
            }

            .fp-tab.active {
                color: var(--yt-text);
                border-bottom-color: var(--yt-red);
            }

            .fp-tab:hover { color: var(--yt-text); }

            .fp-tab-opts {
                margin-left: auto;
                background: none;
                border: none;
                color: var(--yt-text2);
                cursor: pointer;
                display: flex;
                align-items: center;
                padding: 0 4px;
                --mdc-icon-size: 22px;
            }
            .fp-tab-opts:hover { color: var(--yt-text); }

            /* ── QUEUE LIST ── */
            .fp-queue-list {
                flex: 1;
                overflow-y: auto;
                padding: 8px 0;
                scrollbar-width: thin;
                scrollbar-color: rgba(255,255,255,0.2) transparent;
            }

            .fp-queue-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 4px;
                border-radius: 6px;
                cursor: pointer;
                transition: background 0.1s;
            }

            .fp-queue-item:hover { background: rgba(255,255,255,0.06); }
            .fp-queue-item.current { background: rgba(255,255,255,0.08); }

            .fp-qi-thumb {
                width: 42px;
                height: 42px;
                border-radius: 4px;
                object-fit: cover;
                flex-shrink: 0;
            }

            .fp-qi-thumb-ph {
                width: 42px;
                height: 42px;
                border-radius: 4px;
                background: var(--yt-surface2);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                color: var(--yt-text2);
            }

            .fp-qi-info {
                flex: 1;
                min-width: 0;
            }

            .fp-qi-title {
                font-size: 14px;
                font-weight: 500;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .fp-qi-artist {
                font-size: 12px;
                color: var(--yt-text2);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .fp-queue-item.current .fp-qi-title { color: var(--yt-red); }

            .fp-qi-playing {
                color: var(--yt-red);
                flex-shrink: 0;
                --mdc-icon-size: 18px;
            }

            .fp-qi-actions {
                display: flex;
                align-items: center;
                gap: 2px;
                flex-shrink: 0;
                opacity: 0.55;
                transition: opacity 0.15s;
            }
            .fp-queue-item:hover .fp-qi-actions { opacity: 1; }
            .fp-qi-act {
                background: none;
                border: none;
                color: var(--yt-text2);
                cursor: pointer;
                padding: 4px;
                border-radius: 50%;
                display: flex;
                --mdc-icon-size: 18px;
            }
            .fp-qi-act:hover { color: #fff; background: rgba(255,255,255,0.1); }

            .fp-queue-loading, .fp-queue-empty {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text2);
                font-size: 14px;
            }

            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 1s linear infinite; }

            /* ── MEDIA CONTROL in full player (force dark-theme colors) ── */
            ytmusic-media-control {
                --primary-text-color: #ffffff;
                --rgb-primary-text-color: 255, 255, 255;
                --primary-color: #ff0000;
                --rgb-primary-color: 255, 0, 0;
            }

            /* ── ICON BUTTONS ── */
            .icon-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text);
                --mdc-icon-size: 22px;
            }

            .icon-btn:hover { background: rgba(255,255,255,0.08); }

            .icon-btn svg {
                width: 22px;
                height: 22px;
                fill: currentColor;
            }

            .cast-btn svg { width: 20px; height: 20px; }

            /* ── SOURCE DROPDOWN ── */
            .source-wrap { position: relative; }

            .source-menu {
                position: absolute;
                top: 100%;
                right: 0;
                z-index: 999;
                background: #2a2a2a;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.5);
                min-width: 200px;
                max-height: 280px;
                overflow-y: auto;
                overscroll-behavior: contain;
                border: 1px solid rgba(255,255,255,0.1);
            }

            .menu-item {
                padding: 11px 16px;
                cursor: pointer;
                font-size: 14px;
                color: var(--yt-text);
            }

            .menu-item:hover { background: rgba(255,255,255,0.08); }
            .menu-item.selected { color: var(--yt-red); font-weight: 600; }
        `];
    }
}

customElements.define("ytmusic-playing-card", YTMusicPlayingCard);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: "ytmusic-playing-card",
    name: "YTMusic Playing",
    description: "Requires the ytube_media_player integration",
});
