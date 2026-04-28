import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { YTMusicListState, YTMusicItem } from "../utils/utils";
import { YTMusicList } from "../elements/ytmusic-list";
import { YTMusicBrowser } from "../elements/ytmusic-browser";
import "../elements/ytmusic-list";
import "../elements/ytmusic-browser";

@customElement("ytmusic-search")
export class YTMusicSearch extends LitElement {
    @state() public _hass: any;
    @state() public _entity: any;
    @state() public _limit: number;
    @state() private _polrYTubeBrowser: YTMusicBrowser;
    @state() private _elements: YTMusicItem[] = [];
    @state() private _searchTextField: any;
    @state() public initialAction: YTMusicItem;

    constructor() {
        super();
        this._limit = 25;
    }

    protected firstUpdated(_changedProperties): void {
        this._polrYTubeBrowser =
            this.renderRoot.querySelector("ytmusic-browser");
        this._searchTextField = this.renderRoot.querySelector("#query");
    }

    _renderResults() {
        return html`
            <ytmusic-browser
                .hass=${this._hass}
                .entity=${this._entity}
                .initialAction=${this.initialAction}
            ></ytmusic-browser>
        `;
    }

    render() {
        return html`
            <div class="content">
                <div class="search">
                    <input
                        type="search"
                        id="query"
                        placeholder="Search..."
                        @keyup="${this.handleKey}"
                    />
                    <select id="filter">
                        <option value="all">All</option>
                        <option value="artists">Artists</option>
                        <option value="songs" selected>Songs</option>
                        <option value="albums">Albums</option>
                        <option value="playlists">Playlists</option>
                    </select>
                </div>
                <div class="results">${this._renderResults()}</div>
            </div>
        `;
    }

    async _fetchResults() {
        try {
            let response = await this._hass.callWS({
                type: "media_player/browse_media",
                entity_id: this._entity?.entity_id,
                media_content_type: "search",
                media_content_id: "",
            });

            if (response["children"]?.length > 0) {
                response["children"].filter(
                    (el) => !el["media_content_id"].startsWith("MPSP")
                );

                this._elements = response;
                this._polrYTubeBrowser.loadElement(response);
                this.requestUpdate();
            }
        } catch (e) {
            console.error(e);
        }
    }

    handleKey(ev) {
        if (ev.keyCode == 13) {
            this._search();
            this._searchTextField.blur();
        }
    }

    async _search() {
        const query = (this.shadowRoot.querySelector("#query") as HTMLInputElement).value;
        const filter = (this.renderRoot.querySelector("#filter") as HTMLSelectElement).value;

        let data;
        if (filter == "all") {
            data = {
                entity_id: this._entity?.entity_id,
                query: query,
                limit: this._limit,
            };
        } else {
            data = {
                entity_id: this._entity?.entity_id,
                query: query,
                filter: filter,
                limit: this._limit,
            };
        }

        await this._hass.callService("ytube_music_player", "search", data);
        this._fetchResults();
    }

    static styles = css`
        .search {
            display: grid;
            grid-template-columns: 1fr min-content;
            align-items: center;
            gap: 4px;
            margin-bottom: 8px;
        }

        input[type="search"] {
            height: 42px;
            background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
            border: none;
            border-radius: 4px;
            color: var(--primary-text-color);
            font-size: 14px;
            padding: 0 12px;
            outline: none;
            width: 100%;
            box-sizing: border-box;
        }

        select {
            height: 42px;
            background: var(--card-background-color);
            border: none;
            border-radius: 4px;
            color: var(--primary-text-color);
            font-size: 14px;
            padding: 0 8px;
            cursor: pointer;
            outline: none;
        }
    `;
}
