import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { isNumeric, YTMusicItem, YTMusicListState } from "../utils/utils";
import "./ytmusic-list-item";
import "./ytmusic-grid-item";

@customElement("ytmusic-list")
export class YTMusicList extends LitElement {
    @state() public entity: any;
    @state() public hass: any;
    @state() public elements: YTMusicItem[];
    @state() public state: YTMusicListState;
    @property() public columns: Number = 1;
    @property() public grid: Boolean = false;

    render() {
        if (this.state == YTMusicListState.LOADING) {
            return html`<div class="loading">Loading...</div>`;
        }

        if (this.state == YTMusicListState.NO_RESULTS) {
            return html`<div class="empty">No results</div>`;
        }

        if (this.state == YTMusicListState.ERROR) {
            return html`<div class="error">Unknown Error</div>`;
        }

        if (this.state == YTMusicListState.HAS_RESULTS) {
            if (this.elements.length == 0) return html``;

            let renderedElements;
            if (this.grid) {
                renderedElements = this.elements.map((element) => {
                    return html`
                        <ytmusic-grid-item
                            .hass=${this.hass}
                            .entity=${this.entity}
                            .element=${element}
                            .current=${this._is_current(element)}
                            @navigate=${(ev) =>
                                this._fireNavigateEvent(ev.detail.action)}
                        ></ytmusic-grid-item>
                    `;
                });
            } else {
                renderedElements = this.elements.map((element) => {
                    return html`
                        <ytmusic-list-item
                            .hass=${this.hass}
                            .entity=${this.entity}
                            .element=${element}
                            .current=${this._is_current(element)}
                            @navigate=${(ev) =>
                                this._fireNavigateEvent(ev.detail.action)}
                        ></ytmusic-list-item>
                    `;
                });
            }

            return html`
                <div
                    class="container"
                    style="--ytmusic-list-columns: ${this.columns}"
                >
                    ${renderedElements}
                </div>
            `;
        }
    }

    private _is_current(element: YTMusicItem): boolean {
        if (this.entity == null) return false;
        if (!isNumeric(element.media_content_id)) return false;

        if ("current_track" in this.entity["attributes"]) {
            return (
                parseInt(element.media_content_id) - 1 ==
                this.entity["attributes"]["current_track"]
            );
        }
        return false;
    }

    private async _fireNavigateEvent(element: YTMusicItem) {
        this.dispatchEvent(
            new CustomEvent("navigate", {
                detail: {
                    action: element,
                },
            })
        );
        return;
    }

    static get styles(): CSSResultGroup {
        return [
            css`
                .container {
                    display: grid;
                    grid-template-columns: repeat(
                        var(--ytmusic-list-columns, 1),
                        minmax(0, 1fr)
                    );
                    gap: 8px;
                    --mdc-list-item-graphic-size: 40px;
                }

                .empty,
                .loading,
                .error {
                    display: grid;
                    align-items: center;
                    justify-items: center;
                    height: 100px;
                    color: var(--primary-text-color, #ffffff);
                }
            `,
        ];
    }
}
