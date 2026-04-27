import {
    LitElement,
    html,
    css,
    CSSResultGroup,
    nothing,
    PropertyValueMap,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PlayableMediaList, YTMusicItem } from "../utils/utils";
import { ForwardBurgerIcon, PlayIcon, RadioTowerIcon } from "../utils/icons";

@customElement("ytmusic-list-item")
export class YTMusicListItem extends LitElement {
    @state() public entity: any;
    @state() public hass: any;
    @state() public element: YTMusicItem;
    @state() public current: boolean;
    private _primaryAction: any;
    private _actions: any[] = [];
    private _hasAdditionalActions: boolean = false;

    protected firstUpdated(
        _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
    ): void {
        if (this.element.can_expand) this._primaryAction = "more";
        else this._primaryAction = "play";

        this._hasAdditionalActions =
            this.element.can_expand == this.element.can_play
                ? this.element.can_expand
                : this.element.media_content_type == "track";
        this.requestUpdate();
    }

    render() {
        return html`
            <div
                class="list-item ${this.current ? "activated" : ""}"
                @click=${this._performPrimaryAction}
            >
                <div class="graphic">
                    ${this._renderThumbnail(this.element)}
                </div>
                <span class="primary-text">${this.element.title}</span>
                <div class="meta">${this._renderAction()}</div>
            </div>
            ${this._hasAdditionalActions
                ? html`
                      <div class="divider"></div>
                      <div class="actions">
                          ${this._primaryAction != "more"
                              ? this._renderMoreButton(this.element)
                              : html``}
                          ${this._primaryAction != "play"
                              ? this._renderPlayButton(this.element)
                              : html``}
                          ${this._renderRadioButton(this.element)}
                      </div>
                  `
                : ``}
        `;
    }

    private _performPrimaryAction() {
        if (this._primaryAction == "more")
            this._fireNavigateEvent(this.element);

        if (this._primaryAction == "play") this._play(this.element);
    }

    private _renderAction() {
        if (this._primaryAction == "more") {
            return html`<span class="meta-icon">${ForwardBurgerIcon}</span>`;
        }

        if (this._primaryAction == "play") {
            return html`<ha-icon icon="mdi:play"></ha-icon>`;
        }

        return html``;
    }

    private _renderMoreButton(element: YTMusicItem) {
        if (!element["can_expand"]) return html``;

        return html`
            <button
                class="icon-btn"
                @click=${(e: Event) => {
                    e.stopPropagation();
                    this._fireNavigateEvent(element);
                }}
            >
                ${ForwardBurgerIcon}
            </button>
        `;
    }

    private _renderPlayButton(element: YTMusicItem) {
        if (!element.can_play) return html``;
        return html`
            <button
                class="icon-btn"
                @click=${(e: Event) => {
                    e.stopPropagation();
                    this._play(element);
                }}
            >
                ${PlayIcon}
            </button>
        `;
    }

    private _renderRadioButton(element: YTMusicItem) {
        if (element.media_content_type == "track") {
            const id =
                element.media_content_type == "track"
                    ? element.media_content_id
                    : this.entity["attributes"]["videoId"];

            return html`
                <button
                    class="icon-btn"
                    @click=${(e: Event) => {
                        e.stopPropagation();
                        this._startRadio(id);
                    }}
                >
                    ${RadioTowerIcon}
                </button>
            `;
        }
        return nothing;
    }

    private _renderThumbnail(element: YTMusicItem) {
        if (element.thumbnail == "") {
            return html`<div class="empty-thumbnail thumbnail">
                <ha-icon icon="mdi:music-box"></ha-icon>
            </div>`;
        }

        return html`
            <img class="thumbnail" src="${element.thumbnail}" />
        `;
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

    private async _startRadio(media_content_id) {
        this.hass.callService("media_player", "shuffle_set", {
            entity_id: this.entity["entity_id"],
            shuffle: false,
        });

        this.hass.callService("media_player", "play_media", {
            entity_id: this.entity["entity_id"],
            media_content_id: media_content_id,
            media_content_type: "vid_channel",
        });
        return;
    }

    private async _play(element: YTMusicItem) {
        if (element.media_content_type == "PLAYLIST_GOTO_TRACK") {
            this.hass.callService("ytube_music_player", "call_method", {
                entity_id: this.entity["entity_id"],
                command: "goto_track",
                parameters: element.media_content_id,
            });

            return;
        }
        if (PlayableMediaList.includes(element.media_class)) {
            this.hass.callService("media_player", "play_media", {
                entity_id: this.entity["entity_id"],
                media_content_id: element.media_content_id,
                media_content_type: element.media_content_type,
            });

            return;
        }
    }

    static get styles(): CSSResultGroup {
        return [
            css`
                :host {
                    display: grid;
                    grid-template-columns: 1fr min-content min-content;
                    align-items: center;
                }

                .list-item {
                    display: grid;
                    grid-template-columns: 40px 1fr min-content;
                    gap: 8px;
                    align-items: center;
                    padding: 4px 8px;
                    border-radius: 12px;
                    cursor: pointer;
                    min-height: 48px;
                }

                .list-item:hover {
                    background: rgba(var(--rgb-primary-text-color), 0.06);
                }

                .list-item.activated {
                    background: rgba(var(--rgb-primary-color), 0.15);
                }

                .graphic {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    flex-shrink: 0;
                }

                .thumbnail {
                    width: 40px;
                    height: 40px;
                    border-radius: 5%;
                    object-fit: cover;
                }

                .empty-thumbnail {
                    display: flex;
                    background-color: rgba(111, 111, 111, 0.2);
                    border-radius: 5%;
                    height: 40px;
                    width: 40px;
                    align-items: center;
                    justify-content: center;
                }

                .primary-text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                }

                .meta {
                    display: flex;
                    align-items: center;
                }

                .meta-icon svg,
                svg {
                    width: 18px;
                    height: 18px;
                    fill: var(--primary-text-color);
                }

                .divider {
                    width: 2px;
                    background: rgba(var(--rgb-primary-text-color), 0.2);
                    height: 50%;
                    margin: 0 4px;
                }

                .actions {
                    display: grid;
                    grid-template-columns: auto;
                    align-items: center;
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
                }

                .icon-btn:hover {
                    background: rgba(var(--rgb-primary-text-color), 0.08);
                }

                .icon-btn svg {
                    width: 18px;
                    height: 18px;
                    fill: currentColor;
                }
            `,
        ];
    }
}
