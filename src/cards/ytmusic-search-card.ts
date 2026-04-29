import { LitElement, html, css, CSSResultGroup, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "../elements/ytmusic-search";
import { CastAudioIcon } from "../utils/icons";

const YTLogoSVG = html`
    <svg viewBox="0 0 24 24" class="yt-icon" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FF0000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
`;

export class YTMusicSearchCard extends LitElement {
    @property() _config: any = {};
    @property() _hass: any;
    @state() _entity: any;
    @state() _runOnce: boolean = false;
    @state() _menuOpen: boolean = false;

    static getConfigElement() {}

    static getStubConfig() {
        return {};
    }

    setConfig(config: any) {
        if (!config.entity_id) {
            throw new Error("entity_id must be specified");
        }
        this._config = structuredClone(config);
        if (!("header" in this._config)) this._config.header = "Music";
        if (!("showHeader" in this._config)) this._config.showHeader = true;
    }

    set hass(hass) {
        if (!this._runOnce) {
            this._hass = hass;
            this._entity = structuredClone(
                this._hass["states"][this._config["entity_id"]]
            );
            this._runOnce = true;
        }
    }

    _renderSourceSelector() {
        if (!this._hass) return html``;

        let media_players: any[] = [];
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
            document.addEventListener("click", () => {
                this._menuOpen = false;
                this.requestUpdate();
            }, { once: true });
        }
    }

    async _selectSource(source: string) {
        const currentSource = this._entity?.attributes?.remote_player_id;
        this._menuOpen = false;
        this.requestUpdate();
        if (source === "" || source === currentSource) return;
        this._hass.callService("media_player", "select_source", {
            entity_id: this._config.entity_id,
            source: source,
        });
    }

    render() {
        return html`
            <ha-card>
                <div class="yt-header">
                    <div class="yt-logo">
                        ${YTLogoSVG}
                        <span class="yt-title">${this._config.header}</span>
                    </div>
                    <div class="header-actions">
                        ${this._renderSourceSelector()}
                    </div>
                </div>
                <div class="content">
                    <ytmusic-search
                        ._hass=${this._hass}
                        ._entity=${this._entity}>
                    </ytmusic-search>
                </div>
            </ha-card>
        `;
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
                overflow: visible;
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

            /* ── CONTENT ── */
            .content {
                padding: 0 8px 12px 8px;
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
                width: 36px;
                height: 36px;
            }

            .icon-btn:hover { background: rgba(255,255,255,0.08); }

            .icon-btn svg {
                width: 22px;
                height: 22px;
                fill: currentColor;
            }

            /* ── SOURCE MENU ── */
            .source-wrap { position: relative; }

            .source-menu {
                position: absolute;
                right: 0;
                top: 44px;
                background: var(--yt-surface2);
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.5);
                z-index: 999;
                min-width: 220px;
                max-height: 40vh;
                overflow-y: scroll;
            }

            .menu-item {
                padding: 12px 16px;
                cursor: pointer;
                font-size: 14px;
                color: var(--yt-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .menu-item:hover { background: rgba(255,255,255,0.08); }

            .menu-item.selected {
                color: var(--yt-red);
                font-weight: 600;
            }
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
