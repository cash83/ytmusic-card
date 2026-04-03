import {
    LitElement,
    html,
    css,
    CSSResultGroup,
    PropertyValueMap,
    nothing,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { join } from "lit/directives/join.js";
import { map } from "lit/directives/map.js";
import { PoLRYTubeList } from "./polr-ytube-list";
import { PoLRYTubeItem, PoLRYTubeListState } from "../utils/utils";
import { ArrowLeftIcon, CloseIcon } from "../utils/icons";

@customElement("polr-ytube-browser")
export class PoLRYTubeBrowser extends LitElement {
    @state() public entity: any;
    @state() public hass: any;
    @property() public initialAction: PoLRYTubeItem;
    @property() public coverNavigation: boolean;
    @property({ type: Boolean }) public hideSearch: boolean = false;
    @state() public initialElements: PoLRYTubeItem;
    @state() private _browseHistory: PoLRYTubeItem[] = [];
    @state() private _previousBrowseHistory: PoLRYTubeItem[] = [];
    @state() private _polrYTubeList: PoLRYTubeList;
    @state() private _searchTextField: any;
    @state() private _isSearchResults: boolean;

    protected updated(
        _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
    ): void {
        if (_changedProperties.has("initialAction")) {
            this._browseHistory = [];
            this._previousBrowseHistory = [];
            this._browse(this.initialAction);
        }
    }

    protected firstUpdated(_changedProperties): void {
        this._polrYTubeList = this.renderRoot.querySelector("polr-ytube-list");
        this._searchTextField = this.renderRoot.querySelector("#query");
    }

    render() {
        return html`
            <div class="container">
                ${this._renderSearch()} ${this._renderNavigation()}
                ${this._renderPlay()}
                <polr-ytube-list
                    .hass=${this.hass}
                    .entity=${this.entity}
                    @navigate=${(ev) => this._browse(ev.detail.action)}
                    .grid=${this.coverNavigation}
                    columns=${this.coverNavigation ? "3" : "1"}
                ></polr-ytube-list>
            </div>
        `;
    }

    _renderSearch() {
        if (this.hideSearch) return nothing;
        return html`
            <div class="search">
                <div class="search-input-wrap">
                    <ha-icon icon="mdi:magnify" class="search-icon"></ha-icon>
                    <input
                        type="search"
                        id="query"
                        placeholder="Search..."
                        @keyup="${this._handleSearchInput}"
                    />
                </div>
                <select id="filter" @change=${this._search}>
                    <option value="all">All</option>
                    <option value="artists">Artists</option>
                    <option value="songs" selected>Songs</option>
                    <option value="playlists">Playlists</option>
                </select>
            </div>
        `;
    }

    public loadElement(element: PoLRYTubeItem) {
        this._browseHistory = [];
        this._isSearchResults = false;
        this._browse(element);
    }

    public async searchExternal(query: string) {
        if (!query || query === "") return;
        const data = {
            entity_id: this.entity?.entity_id,
            query: query,
            limit: 40,
        };
        await this.hass.callService("ytube_music_player", "search", data);
        this._fetchSearchResults();
    }

    async _browse(element: PoLRYTubeItem) {
        this._polrYTubeList.state = PoLRYTubeListState.LOADING;
        this._browseHistory.push(element);

        if (element.children?.length > 0) {
            this._polrYTubeList.elements = element["children"];
            this._polrYTubeList.state = PoLRYTubeListState.HAS_RESULTS;
        } else {
            try {
                const wsParams: any = {
                    type: "media_player/browse_media",
                    entity_id: this.entity["entity_id"],
                };
                if (element.media_content_type != null) wsParams.media_content_type = element.media_content_type;
                if (element.media_content_id != null) wsParams.media_content_id = element.media_content_id;
                const response = await this.hass.callWS(wsParams);

                this._polrYTubeList.elements = response["children"];
                this._polrYTubeList.state = PoLRYTubeListState.HAS_RESULTS;
            } catch (e) {
                this._polrYTubeList.state = PoLRYTubeListState.ERROR;
                console.error(
                    e,
                    element.media_content_type,
                    element.media_content_id
                );
            }
        }
        this.requestUpdate();
    }

    async _fetchSearchResults() {
        this._polrYTubeList.state = PoLRYTubeListState.LOADING;

        try {
            let response = await this.hass.callWS({
                type: "media_player/browse_media",
                entity_id: this.entity?.entity_id,
                media_content_type: "search",
                media_content_id: "",
            });

            if (response["children"]?.length > 0) {
                response["children"].filter(
                    (el) => !el["media_content_id"].startsWith("MPSP")
                );

                if (!this._isSearchResults)
                    this._previousBrowseHistory = this._browseHistory;

                this._isSearchResults = true;
                this._browseHistory = [];
                this._browse(response);

                this.requestUpdate();
            } else this._polrYTubeList.state = PoLRYTubeListState.NO_RESULTS;
        } catch (e) {
            this._polrYTubeList.state = PoLRYTubeListState.ERROR;
            console.error(e);
        }
    }

    private _renderNavigation() {
        if (this._browseHistory.length <= 1 && !this._isSearchResults)
            return html``;

        let breadcrumbItems;
        if (this._browseHistory.length > 2) {
            breadcrumbItems = [
                this._browseHistory[0].title,
                "...",
                this._browseHistory[this._browseHistory.length - 1].title,
            ];
        } else {
            breadcrumbItems = this._browseHistory.map((item) => item.title);
        }

        let breadcrumb = html`
            ${join(
                map(
                    breadcrumbItems,
                    (i) => html`<span class="crumb">${i}</span>`
                ),
                html`<span class="separator">/</span>`
            )}
        `;

        return html`
            <div class="navigation-row">
                ${this._isSearchResults
                    ? html`
                          <button
                              class="icon-btn"
                              @click=${() => {
                                  this._isSearchResults = false;
                                  this._browseHistory =
                                      this._previousBrowseHistory;
                                  this._searchTextField.value = "";
                                  this._browse(this._browseHistory.pop());
                              }}
                          >
                              ${CloseIcon}
                          </button>
                      `
                    : nothing}
                ${this._browseHistory.length > 1
                    ? html`
                          <button
                              class="icon-btn"
                              @click=${() =>
                                  this._browse(
                                      this._browseHistory.pop() &&
                                          this._browseHistory.pop()
                                  )}
                          >
                              ${ArrowLeftIcon}
                          </button>
                      `
                    : nothing}
                ${this._browseHistory.length > 1 || this._isSearchResults
                    ? html`<div class="breadcrumb">${breadcrumb}</div>`
                    : nothing}
            </div>
        `;
    }

    private _renderPlay() {
        const element = this._browseHistory[this._browseHistory.length - 1];
        if (element?.can_play) {
            return html`
                <div class="playable_result">
                    ${element.title}
                    <button
                        class="play-btn"
                        @click=${() =>
                            this.hass.callService(
                                "media_player",
                                "play_media",
                                {
                                    entity_id: this.entity["entity_id"],
                                    media_content_id: element.media_content_id,
                                    media_content_type:
                                        element.media_content_type,
                                }
                            )}
                    >
                        Play
                    </button>
                </div>
            `;
        }
    }

    private _handleSearchInput(ev) {
        if (ev.keyCode == 13) {
            this._search();
            this._searchTextField.blur();
        }
    }

    async _search() {
        const query = (this.shadowRoot.querySelector("#query") as HTMLInputElement)?.value;
        const filter = (this.renderRoot.querySelector("#filter") as HTMLSelectElement)?.value;

        if (!query || query == "") return;

        let data;
        if (filter == "all") {
            data = {
                entity_id: this.entity?.entity_id,
                query: query,
                limit: 40,
            };
        } else {
            data = {
                entity_id: this.entity?.entity_id,
                query: query,
                filter: filter,
                limit: 40,
            };
        }

        await this.hass.callService("ytube_music_player", "search", data);
        this._fetchSearchResults();
    }

    static get styles(): CSSResultGroup {
        return [
            css`
                .container {
                    display: flex;
                    overflow: auto;
                    flex-grow: 1;
                    flex-direction: column;
                    gap: 8px;
                }

                .navigation-row {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    justify-content: flex-start;
                }

                .breadcrumb {
                    display: flex;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    align-items: center;
                    margin-left: 4px;
                }

                .crumb {
                    background-color: rgba(111, 111, 111, 0.2);
                    padding: 4px 8px;
                    border-radius: 4px;
                    text-transform: uppercase;
                    font-size: 10px;
                    font-weight: bold;
                }

                .separator {
                    font-weight: bold;
                    padding: 4px;
                }

                .search {
                    display: grid;
                    grid-template-columns: 1fr 120px;
                    align-items: center;
                    gap: 4px;
                }

                .search-input-wrap {
                    display: flex;
                    align-items: center;
                    background: rgba(var(--rgb-primary-text-color), 0.06);
                    border-radius: 4px;
                    padding: 0 8px;
                    height: 42px;
                    gap: 4px;
                }

                .search-input-wrap input {
                    flex: 1;
                    background: none;
                    border: none;
                    outline: none;
                    color: var(--primary-text-color);
                    font-size: 14px;
                    height: 100%;
                }

                .search-input-wrap ha-icon {
                    --mdc-icon-size: 18px;
                    opacity: 0.6;
                }

                select {
                    height: 42px;
                    background: rgba(var(--rgb-primary-text-color), 0.06);
                    border: none;
                    border-radius: 4px;
                    color: var(--primary-text-color);
                    font-size: 14px;
                    padding: 0 8px;
                    cursor: pointer;
                    outline: none;
                    width: 100%;
                }

                .playable_result {
                    display: inline-flex;
                    justify-content: space-between;
                    align-items: center;
                }

                polr-ytube-list {
                    overflow: auto;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary-text-color);
                    width: 30px;
                    height: 30px;
                }

                .icon-btn:hover {
                    background: rgba(var(--rgb-primary-text-color), 0.08);
                }

                .icon-btn svg {
                    width: 20px;
                    height: 20px;
                    fill: currentColor;
                }

                .play-btn {
                    background: var(--primary-color);
                    color: var(--text-primary-color);
                    border: none;
                    border-radius: 4px;
                    padding: 6px 16px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                }

                .play-btn:hover {
                    opacity: 0.9;
                }
            `,
        ];
    }
}
