import {
    LitElement,
    html,
    css,
    CSSResultGroup,
    nothing,
    PropertyValueMap,
} from "lit";
import { customElement, property } from "lit/decorators.js";
import "../shared/ytmusic-slider";
import { secondsToMMSS } from "../utils/utils";
import {
    PauseIcon,
    PlayIcon,
    RadioTowerIcon,
    RepeatIcon,
    ShuffleVariantIcon,
    SkipPreviousIcon,
    SkipNextIcon,
    ThumbUpIcon,
    ThumbUpOutlineIcon,
    VolumeOffIcon,
    VolumeHighIcon,
} from "../utils/icons";

@customElement("ytmusic-media-control")
export class YTMusicMediaControl extends LitElement {
    @property() hass: any;
    @property() entity: any;
    volumeSlider: any;
    tracker: any;
    progress: any;
    progressSlider: any;
    @property() progressTime: string;

    async connectedCallback() {
        super.connectedCallback();
        this._trackProgress();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.tracker);
        this.tracker = null;
    }

    protected firstUpdated(
        _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
    ): void {
        this.volumeSlider = this.renderRoot.querySelector("#volume") as any;
        if (this.volumeSlider)
            this.volumeSlider.value =
                this.entity?.attributes?.volume_level * 100;

        this.progressSlider = this.renderRoot.querySelector(
            "#progressSlider"
        ) as any;
    }

    render() {
        return html`
            <div class="volume-row">
                <button class="icon-btn" @click=${this._toggleMute}>
                    ${this.entity?.attributes?.is_volume_muted
                        ? VolumeOffIcon
                        : VolumeHighIcon}
                </button>
                <ytmusic-slider
                    id="volume"
                    min="0"
                    max="100"
                    step="1"
                    @change=${this._changeVolume}
                ></ytmusic-slider>
            </div>
            <div class="action-row">
                ${this._renderLikeButton()} ${this._renderRadioButton()}
            </div>
            <div class="progress-row">${this._renderProgress()}</div>
            <div class="control-row">
                ${this._renderShuffle()} ${this._renderPrevious()}
                ${this._renderPlayPause()} ${this._renderNext()}
                ${this._renderRepeat()}
            </div>
        `;
    }

    _renderLikeButton() {
        if (!("likeStatus" in this.entity?.attributes)) return html``;

        return html`
            <button class="icon-btn" @click=${() => this._likeSong()}>
                ${this.entity?.attributes?.likeStatus == "LIKE"
                    ? ThumbUpIcon
                    : ThumbUpOutlineIcon}
            </button>
        `;
    }

    _renderNext() {
        return html`
            <button class="icon-btn" @click=${this._skipNext}>
                ${SkipNextIcon}
            </button>
        `;
    }

    _renderPlayPause() {
        return html`
            <button class="icon-btn playPause" @click=${this._togglePlayPause}>
                ${this.entity.state == "playing" ? PauseIcon : PlayIcon}
            </button>
        `;
    }

    _renderPrevious() {
        return html`
            <button class="icon-btn" @click=${this._skipPrevious}>
                ${SkipPreviousIcon}
            </button>
        `;
    }

    _renderProgress() {
        let totalTime = secondsToMMSS(this.entity?.attributes?.media_duration);

        return html`
            <div class="time">
                <span>${this.progressTime}</span>
                <ytmusic-slider
                    id="progressSlider"
                    min="0"
                    step="1"
                    max=${Math.round(this.entity?.attributes?.media_duration ?? 0)}
                    @change=${this._seekProgress}
                ></ytmusic-slider>
                <span>${totalTime}</span>
            </div>
        `;
    }

    _renderRadioButton() {
        return html`
            <button class="icon-btn" @click=${this._startRadio}>
                ${RadioTowerIcon}
            </button>
        `;
    }

    _renderRepeat() {
        return html`
            <button class="icon-btn" @click=${this._changeRepeat}>
                ${RepeatIcon}
            </button>
        `;
    }

    _renderShuffle() {
        return html`
            <button class="icon-btn" @click=${this._shuffleList}>
                ${ShuffleVariantIcon}
            </button>
        `;
    }

    async _changeRepeat() {
        const repeat = this.entity?.attributes?.repeat;
        let newRepeat;

        switch (repeat) {
            case "off":
                newRepeat = "one";
                break;
            case "one":
                newRepeat = "all";
                break;
            case "all":
                newRepeat = "off";
                break;
            default:
                break;
        }

        this.hass.callService("media_player", "repeat_set", {
            entity_id: this.entity["entity_id"],
            repeat: newRepeat,
        });
    }

    async _changeVolume() {
        this.hass.callService("media_player", "volume_set", {
            entity_id: this.entity["entity_id"],
            volume_level: this.volumeSlider.value / 100,
        });
    }

    async _likeSong() {
        await this.hass.callService("ytube_music_player", "rate_track", {
            entity_id: this.entity?.entity_id,
            rating: "thumb_toggle_up_middle",
        });
        this.requestUpdate();
    }

    async _seekProgress() {
        let progress = this.renderRoot.querySelector("#progressSlider") as any;

        this.hass.callService("media_player", "media_seek", {
            entity_id: this.entity["entity_id"],
            seek_position: progress.value,
        });
    }

    async _shuffleList() {
        const shuffle = this.entity?.attributes?.shuffle;

        this.hass.callService("media_player", "shuffle_set", {
            entity_id: this.entity["entity_id"],
            shuffle: !shuffle,
        });
    }

    async _skipNext() {
        this.hass.callService("media_player", "media_next_track", {
            entity_id: this.entity["entity_id"],
        });
    }

    async _startRadio() {
        await this.hass.callService("media_player", "shuffle_set", {
            entity_id: this.entity["entity_id"],
            shuffle: false,
        });

        this.hass.callService("media_player", "play_media", {
            entity_id: this.entity["entity_id"],
            media_content_id: this.entity?.attributes?.videoId,
            media_content_type: "vid_channel",
        });
    }

    async _toggleMute() {
        this.hass.callService("media_player", "volume_mute", {
            entity_id: this.entity["entity_id"],
            is_volume_muted: !this.entity?.attributes?.is_volume_muted,
        });
    }

    async _trackProgress() {
        let now = Date.now();

        let last_update = Date.parse(
            this.entity?.attributes?.media_position_updated_at
        );

        let current =
            this.entity?.attributes?.media_position +
            (now - last_update) / 1000;

        if (this.progressSlider != null) {
            if (this.entity?.attributes?.media_position != null) {
                this.progressSlider.value = Math.round(current);
                this.progressTime = secondsToMMSS(current);
            }
        }

        if (!this.tracker)
            this.tracker = setInterval(() => this._trackProgress(), 1000);
    }

    async _skipPrevious() {
        this.hass.callService("media_player", "media_previous_track", {
            entity_id: this.entity["entity_id"],
        });
    }

    async _togglePlayPause() {
        this.hass.callService("media_player", "media_play_pause", {
            entity_id: this.entity["entity_id"],
        });
    }

    static get styles(): CSSResultGroup {
        return [
            css`
                :host {
                    display: grid;
                    gap: 4px;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
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
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }

                .volume-row {
                    display: grid;
                    grid-template-columns: min-content 1fr;
                    align-items: center;
                    padding: 0 4px;
                }

                .action-row {
                    display: grid;
                    grid-template-columns: min-content min-content;
                    justify-content: space-evenly;
                }

                .progress-row {
                    display: grid;
                    grid-template-columns: 1fr;
                }

                .control-row {
                    display: grid;
                    grid-template-columns: min-content min-content min-content min-content min-content;
                    align-items: center;
                    justify-content: space-evenly;
                }

                .playPause svg {
                    width: 48px;
                    height: 48px;
                }

                .playPause {
                    padding: 8px;
                }

                .time {
                    display: grid;
                    grid-template-columns: min-content 1fr min-content;
                    align-items: center;
                }

                #volume {
                    --md-sys-color-primary: var(--primary-color);
                }

                #progressSlider {
                    --md-sys-color-primary: var(--primary-color);
                }
            `,
        ];
    }
}
