import { LitElement, html, css, CSSResultGroup, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "../elements/ytmusic-search";
import { CastAudioIcon } from "../utils/icons";
import { areDeeplyEqual } from "../utils/utils";

const YTLogoSVG = html`
    <svg viewBox="0 0 24 24" class="yt-icon" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FF0000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
`;

export class YTMusicSearchCard extends LitElement {
    @property() _config: any = {};
    _hass: any;
    @state() _entity: any;
    @state() _menuOpen: boolean = false;

    static getConfigElement() {}

    static getStubConfig() {
        return { entity_id: "media_player.ytube_music_player" };
    }

    setConfig(config: any) {
        if (!config.entity_id) throw new Error("entity_id must be specified");
        this._config = structuredClone(config);
        if (!("header" in this._config)) this._config.header = "YouTube Music Search";
    }

    set hass(hass) {
        this._hass = hass;
        const newEntity = this._hass["states"][this._config["entity_id"]];
        if (!areDeeplyEqual(this._entity, newEntity, [])) {
            this._entity = structuredClone(newEntity);
        }
    }

    render() {
        const vol = this._entity?.attributes?.volume_level;
        const curVol = vol != null ? Math.round(vol * 100) : 50;
        const muted = this._entity?.attributes?.is_volume_muted;

        return html`
            <ha-card>
                <div class="yt-header">
                    <div class="yt-logo">
                        ${YTLogoSVG}
                        <span class="yt-title">Music</span>
                    </div>
                    <div class="header-actions">
                        <button class="icon-btn" @click=${this._toggleMute}>
                            <ha-icon icon="${muted ? 'mdi:volume-off' : 'mdi:volume-high'}"></ha-icon>
                        </button>
                        <input
                            type="range"
                            class="vol-slider"
                            min="0" max="100" step="1"
                            .value=${String(curVol)}
                            @change=${this._onVolumeChange}
                        />
                        ${this._renderSourceSelector()}
                    </div>
                </div>
                <div class="search-wrap">
                    <ytmusic-search
                        ._hass=${this._hass}
                        ._entity=${this._entity}
                    ></ytmusic-search>
                </div>
            </ha-card>
        `;
    }

    _renderSourceSelector() {
        if (!this._hass) return html``;

        let media_players: [string, string][] = [];
        for (const [key, value] of Object.entries(this._hass["states"])) {
            if (key.startsWith("media_player")) {
                if ((value as any)?.attributes?.remote_player_id) continue;
                if ("speakers" in this._config && !this._config.speakers.includes(key)) continue;
                media_players.push([key, (value as any)["attributes"]["friendly_name"]]);
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

    _toggleMenu(e: Event) {
        e.stopPropagation();
        this._menuOpen = !this._menuOpen;
        if (this._menuOpen) {
            document.addEventListener("click", () => { this._menuOpen = false; }, { once: true });
        }
    }

    async _selectSource(source: string) {
        this._menuOpen = false;
        const currentSource = this._entity?.attributes?.remote_player_id;
        if (source === "" || source === currentSource) return;
        this._hass.callService("media_player", "select_source", {
            entity_id: this._config.entity_id,
            source: source,
        });
    }

    _onVolumeChange(e: Event) {
        const val = Number((e.target as HTMLInputElement).value);
        this._hass.callService("media_player", "volume_set", {
            entity_id: this._config.entity_id,
            volume_level: val / 100,
        });
    }

    async _toggleMute() {
        this._hass.callService("media_player", "volume_mute", {
            entity_id: this._config.entity_id,
            is_volume_muted: !this._entity?.attributes?.is_volume_muted,
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
            }

            ha-card {
                background: var(--yt-bg) !important;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border-radius: 12px;
                color: var(--yt-text);
            }

            /* ── HEADER ── */
            .yt-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 16px 8px;
                flex-shrink: 0;
                gap: 8px;
            }

            .yt-logo {
                display: flex;
                align-items: center;
                gap: 6px;
                flex-shrink: 0;
            }

            .yt-icon { width: 26px; height: 26px; }

            .yt-title {
                font-size: 17px;
                font-weight: 600;
                color: var(--yt-text);
                letter-spacing: 0.3px;
            }

            .header-actions {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            /* ── VOLUME ── */
            .vol-slider {
                width: 80px;
                -webkit-appearance: none;
                appearance: none;
                height: 3px;
                border-radius: 2px;
                background: rgba(255,255,255,0.25);
                outline: none;
                cursor: pointer;
                flex-shrink: 0;
            }

            .vol-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--yt-text);
                cursor: pointer;
            }

            .vol-slider::-moz-range-thumb {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--yt-text);
                cursor: pointer;
                border: none;
            }

            /* ── SEARCH WRAPPER ── */
            .search-wrap {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                padding: 0 8px 8px;
            }

            ytmusic-search {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                --primary-text-color: #ffffff;
                --rgb-primary-text-color: 255, 255, 255;
                --primary-color: #ff0000;
                --rgb-primary-color: 255, 0, 0;
                --card-background-color: #1e1e1e;
                color: #ffffff;
            }

            /* ── ICON BUTTONS ── */
            .icon-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 6px;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: var(--yt-text);
                --mdc-icon-size: 20px;
                flex-shrink: 0;
            }

            .icon-btn:hover { background: rgba(255,255,255,0.08); }

            .icon-btn svg {
                width: 20px;
                height: 20px;
                fill: currentColor;
            }

            .cast-btn svg { width: 18px; height: 18px; }

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

customElements.define("ytmusic-search-card", YTMusicSearchCard);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: "ytmusic-search-card",
    name: "YTMusic Search",
    description: "Requires the ytube_media_player integration",
});
