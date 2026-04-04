import {
    LitElement,
    html,
    css,
    CSSResultGroup,
    PropertyValueMap,
    nothing,
} from "lit";
import { property, state, query } from "lit/decorators.js";
import "../elements/polr-media-control";
import "../elements/polr-ytube-browser";
import { areDeeplyEqual, PoLRYTubeItem } from "../utils/utils";
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

export class PoLRYTubePlayingCard extends LitElement {
    @state() _config: any = {};
    _hass: any;
    @state() _entity: any;
    @state() _menuOpen: boolean = false;
    @state() _playerExpanded: boolean = false;
    @state() _activeFilter: number = 0;
    @state() _searchActive: boolean = false;
    @query("polr-ytube-browser") _browser: any;
    private _rootItems: any[] = [];
    private _homeItems: any[] = [];
    private _rootLoaded = false;

    static getConfigElement() {}

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
            this._config.initialAction = new PoLRYTubeItem();
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

    private async _loadRoot() {
        try {
            // 1. Fetch root categories
            const rootResp = await this._hass.callWS({
                type: "media_player/browse_media",
                entity_id: this._config.entity_id,
            });
            this._rootItems = (rootResp?.children || []).filter(
                (el: any) => !el.media_content_id?.startsWith("MPSP")
            );
            console.log("[YTube] root items:", this._rootItems.map((i: any) => `${i.title} [${i.media_content_type}]`));

            // 2. Cascade into "Home" to get its sections (for Scelte rapide etc.)
            const homeItem = this._rootItems.find(
                (item: any) => item.title?.toLowerCase() === "home"
            ) || this._rootItems[0];
            if (homeItem) {
                try {
                    const homeResp = await this._hass.callWS({
                        type: "media_player/browse_media",
                        entity_id: this._config.entity_id,
                        media_content_type: homeItem.media_content_type,
                        media_content_id: homeItem.media_content_id,
                    });
                    this._homeItems = (homeResp?.children || []).filter(
                        (el: any) => !el.media_content_id?.startsWith("MPSP")
                    );
                } catch (e) {
                    console.error("YTube: failed to load home sections", e);
                }
            }

            await this.updateComplete;
            this._navigateToFilter(this._activeFilter);
        } catch (e) {
            console.error("YTube: failed to load root items", e);
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

    private _onPillsWheel(e: WheelEvent) {
        if (e.deltaY === 0) return;
        e.preventDefault();
        (e.currentTarget as HTMLElement).scrollLeft += e.deltaY;
    }

    render() {
        return html`
            <ha-card>
                ${this._searchActive ? this._renderSearchHeader() : this._renderHeader()}
                <div class="pills-container" @wheel=${this._onPillsWheel}>
                    <div class="pills-row">
                        ${YT_FILTERS.map((f, i) => html`
                            <button
                                class="pill ${this._activeFilter === i ? "active" : ""}"
                                @click=${() => this._selectFilter(i, f)}
                            >${f.label}</button>
                        `)}
                    </div>
                </div>
                <div class="content-area">
                    <polr-ytube-browser
                        .hass=${this._hass}
                        .entity=${this._entity}
                        .initialAction=${this._config.initialAction}
                        .coverNavigation=${this._config.coverNavigation}
                        .hideSearch=${true}
                    ></polr-ytube-browser>
                </div>
                ${this._entity?.state !== "off" ? this._renderMiniPlayer() : nothing}
                ${this._playerExpanded ? this._renderFullPlayer() : nothing}
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
                    ${this._renderSourceSelector()}
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

    _renderSourceSelector() {
        if (!this._hass) return html``;

        let media_players = [];
        for (const [key, value] of Object.entries(this._hass["states"])) {
            if (key.startsWith("media_player")) {
                if ((value as any)?.attributes?.remote_player_id) continue;
                if ("speakers" in this._config && !this._config.speakers.includes(key)) continue;
                media_players.push([key, value["attributes"]["friendly_name"]]);
            }
        }
        media_players.sort((a, b) => a[1] < b[1] ? -1 : 1);

        return html`
            <div class="source-wrap">
                <button class="icon-btn cast-btn" @click=${this._toggleMenu}>
                    ${CastAudioIcon}
                </button>
                ${this._menuOpen ? html`
                    <div class="source-menu" @click=${(e: Event) => e.stopPropagation()}>
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

        return html`
            <div class="full-player"
                style="${art ? `--fp-bg: url('${art}')` : ""}">
                <div class="fp-bg-blur"></div>
                <div class="fp-content">
                    <div class="fp-header">
                        <button class="icon-btn" @click=${() => { this._playerExpanded = false; }}>
                            <ha-icon icon="mdi:chevron-down"></ha-icon>
                        </button>
                        <span class="fp-from">In riproduzione</span>
                        ${this._renderSourceSelector()}
                    </div>
                    <div class="fp-art-wrap">
                        ${art
                            ? html`<img class="fp-art" src="${art}">`
                            : html`<div class="fp-art-ph"><ha-icon icon="mdi:music-note" style="--mdc-icon-size:80px"></ha-icon></div>`}
                    </div>
                    <div class="fp-info">
                        <div>
                            <div class="fp-title">${title}</div>
                            <div class="fp-artist">${artist}</div>
                        </div>
                    </div>
                    <polr-media-control
                        .hass=${this._hass}
                        .entity=${this._entity}
                    ></polr-media-control>
                </div>
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

    _toggleMenu(e: Event) {
        e.stopPropagation();
        this._menuOpen = !this._menuOpen;
        if (this._menuOpen) {
            document.addEventListener("click", () => { this._menuOpen = false; }, { once: true });
        }
    }

    async _selectSource(source: string) {
        const currentSource = this._entity?.attributes?.remote_player_id;
        this._menuOpen = false;
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

            polr-ytube-browser {
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
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px 0;
                min-height: 0;
            }

            .fp-art {
                max-width: 100%;
                max-height: 100%;
                border-radius: 8px;
                box-shadow: 0 8px 40px rgba(0,0,0,0.6);
                aspect-ratio: 1/1;
                object-fit: cover;
            }

            .fp-art-ph {
                width: 240px;
                height: 240px;
                border-radius: 8px;
                background: var(--yt-surface);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text2);
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

            /* ── MEDIA CONTROL in full player (force dark-theme colors) ── */
            polr-media-control {
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

customElements.define("polr-ytube-playing-card", PoLRYTubePlayingCard);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: "polr-ytube-playing-card",
    name: "PoLR YouTube Playing",
    description: "Requires the ytube_media_player integration",
});
