import {
    LitElement,
    html,
    css,
    svg,
    CSSResultGroup,
    nothing,
    PropertyValueMap,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
    @state() private _repeatActive: boolean | undefined = undefined;
    @state() private _shuffleActive: boolean | undefined = undefined;
    @state() private _pct: number = 0;
    tracker: any;
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

    // Repeating sine wave path (wavelength 40px, midline 12, amplitude 6).
    // Animated with a 40px translate loop -> a wave that flows while playing.
    private _wavePath(w = 800): string {
        let d = "M0 12 Q10 6 20 12";
        for (let x = 40; x <= w; x += 20) d += ` T${x} 12`;
        return d;
    }

    private _wave(color: string) {
        return svg`<svg class="wave" width="800" height="24" viewBox="0 0 800 24"
            preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="${this._wavePath(800)}" fill="none" stroke="${color}"
                stroke-width="3" stroke-linecap="round"></path>
        </svg>`;
    }

    render() {
        const playing = this.entity?.state === "playing";
        const totalTime = secondsToMMSS(this.entity?.attributes?.media_duration);
        const pct = Math.max(0, Math.min(100, this._pct));
        const vol = Math.round((this.entity?.attributes?.volume_level ?? 0) * 100);
        const muted = !!this.entity?.attributes?.is_volume_muted;
        const isMA = this.entity?.attributes?.app_id === "music_assistant";

        const shuffleActive = this._shuffleActive !== undefined
            ? this._shuffleActive
            : !!this.entity?.attributes?.shuffle;
        const repeatActive = this._repeatActive !== undefined
            ? this._repeatActive
            : !!(this.entity?.attributes?.repeat && this.entity?.attributes?.repeat !== "off");

        return html`
            <!-- wavy progress -->
            <div class="wavebar">
                <span class="t">${this.progressTime ?? "0:00"}</span>
                <div class="wave-wrap ${playing ? "playing" : ""}" @click=${this._seekClick}>
                    <div class="wlayer grey">${this._wave("#3a3a3a")}</div>
                    <div class="wlayer red" style="width:${pct}%">${this._wave("var(--yt-red, #ff0000)")}</div>
                    <div class="whandle" style="left:${pct}%"></div>
                </div>
                <span class="t">${totalTime}</span>
            </div>

            <!-- transport: prev square / play big / next square -->
            <div class="controls">
                <button class="sq" @click=${this._skipPrevious}>${SkipPreviousIcon}</button>
                <button class="playbtn" @click=${this._togglePlayPause}>
                    ${playing ? PauseIcon : PlayIcon}
                </button>
                <button class="sq" @click=${this._skipNext}>${SkipNextIcon}</button>
            </div>

            <!-- labeled pills -->
            <div class="pills">
                <button class="pill ${shuffleActive ? "on" : ""}" @click=${this._shuffleList}>
                    ${ShuffleVariantIcon}<span>Casuale</span>
                </button>
                <button class="pill ${repeatActive ? "on" : ""}" @click=${this._changeRepeat}>
                    ${RepeatIcon}<span>Ripeti</span>
                </button>
            </div>

            <!-- volume pill + speaker on the right -->
            <div class="volume">
                ${!isMA ? html`<button class="radio-btn" @click=${this._startRadio} title="Radio">
                    ${RadioTowerIcon}
                </button>` : nothing}
                <div class="volwrap">
                    <div class="volfill" style="width:${muted ? 0 : vol}%"></div>
                    <div class="volthumb" style="left:${muted ? 0 : vol}%"></div>
                    <input class="vol" type="range" min="0" max="100" step="1"
                        .value=${String(muted ? 0 : vol)} @input=${this._changeVolumeInput} />
                </div>
                <button class="spk" @click=${this._toggleMute}>
                    ${muted ? VolumeOffIcon : VolumeHighIcon}
                </button>
            </div>
        `;
    }

    private _seekClick(ev: MouseEvent) {
        const wrap = ev.currentTarget as HTMLElement;
        const rect = wrap.getBoundingClientRect();
        const frac = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
        const duration = this.entity?.attributes?.media_duration ?? 0;
        if (!duration) return;
        this._pct = frac * 100;
        this.hass.callService("media_player", "media_seek", {
            entity_id: this.entity["entity_id"],
            seek_position: Math.round(frac * duration),
        });
    }

    private _changeVolumeInput(ev: Event) {
        const v = Number((ev.target as HTMLInputElement).value);
        this.hass.callService("media_player", "volume_set", {
            entity_id: this.entity["entity_id"],
            volume_level: v / 100,
        });
    }

    async _changeRepeat() {
        const repeat = this.entity?.attributes?.repeat;
        let newRepeat;
        switch (repeat) {
            case "off": newRepeat = "one"; break;
            case "one": newRepeat = "all"; break;
            case "all": newRepeat = "off"; break;
            default: break;
        }
        this._repeatActive = newRepeat !== "off";
        this.hass.callService("media_player", "repeat_set", {
            entity_id: this.entity["entity_id"],
            repeat: newRepeat,
        });
        this.requestUpdate();
    }

    async _likeSong() {
        await this.hass.callService("ytube_music_player", "rate_track", {
            entity_id: this.entity?.entity_id,
            rating: "thumb_toggle_up_middle",
        });
        this.requestUpdate();
    }

    async _shuffleList() {
        const shuffle = this.entity?.attributes?.shuffle;
        this._shuffleActive = !shuffle;
        this.hass.callService("media_player", "shuffle_set", {
            entity_id: this.entity["entity_id"],
            shuffle: !shuffle,
        });
        this.requestUpdate();
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
        const now = Date.now();
        const last_update = Date.parse(this.entity?.attributes?.media_position_updated_at);
        const duration = this.entity?.attributes?.media_duration;
        const base = this.entity?.attributes?.media_position;
        if (base != null) {
            const current = this.entity?.state === "playing"
                ? base + (now - last_update) / 1000
                : base;
            this.progressTime = secondsToMMSS(current);
            if (duration) this._pct = Math.min((current / duration) * 100, 100);
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
                    gap: 14px;
                    padding-bottom: 16px;
                    --yt-red: var(--yt-red, #ff0000);
                }

                /* ---- wavy progress ---- */
                .wavebar {
                    display: grid;
                    grid-template-columns: min-content 1fr min-content;
                    align-items: center;
                    gap: 8px;
                }
                .wavebar .t {
                    font-size: 11px;
                    color: var(--secondary-text-color, #9a9a9a);
                    white-space: nowrap;
                }
                .wave-wrap {
                    position: relative;
                    height: 24px;
                    cursor: pointer;
                }
                .wlayer {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    overflow: hidden;
                }
                .wlayer.grey { right: 0; }
                .wlayer svg.wave {
                    height: 100%;
                    width: 800px;
                    display: block;
                }
                .wave-wrap.playing svg.wave {
                    animation: wave-flow 1s linear infinite;
                }
                @keyframes wave-flow {
                    from { transform: translateX(0); }
                    to { transform: translateX(-40px); }
                }
                .whandle {
                    position: absolute;
                    top: 50%;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--yt-red, #ff0000);
                    transform: translate(-50%, -50%);
                    box-shadow: 0 0 8px rgba(255, 0, 0, 0.6);
                    pointer-events: none;
                }

                /* ---- transport ---- */
                .controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                }
                .sq, .playbtn {
                    border: none;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                }
                .sq {
                    width: 52px;
                    height: 44px;
                    border-radius: 14px;
                    background: #2c2c2e;
                }
                .sq:hover { background: #3a3a3c; }
                .playbtn {
                    width: 96px;
                    height: 52px;
                    border-radius: 16px;
                    background: var(--yt-red, #ff0000);
                    box-shadow: 0 6px 18px rgba(255, 0, 0, 0.4);
                }
                .playbtn:hover { filter: brightness(1.08); }
                .sq svg { width: 24px; height: 24px; fill: currentColor; }
                .playbtn svg { width: 30px; height: 30px; fill: currentColor; }

                /* ---- pills ---- */
                .pills {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 13px;
                    border-radius: 18px;
                    background: #1f1f1f;
                    border: 1px solid #333;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .pill svg { width: 16px; height: 16px; fill: currentColor; }
                .pill.on {
                    background: rgba(255, 0, 0, 0.14);
                    border-color: var(--yt-red, #ff0000);
                }
                .pill.on svg { fill: var(--yt-red, #ff0000); }

                /* ---- volume ---- */
                .volume {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .radio-btn, .spk {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--primary-text-color, #fff);
                    display: inline-flex;
                    padding: 2px;
                }
                .radio-btn svg, .spk svg { width: 22px; height: 22px; fill: currentColor; }
                .spk { color: var(--yt-red, #ff0000); }
                .volwrap {
                    position: relative;
                    flex: 1;
                    height: 26px;
                    border-radius: 13px;
                    background: #2a2f3a;
                    overflow: hidden;
                }
                .volfill {
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    background: var(--yt-red, #ff0000);
                    opacity: 0.85;
                    border-radius: 13px;
                }
                .volthumb {
                    position: absolute;
                    top: 3px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #fff;
                    transform: translateX(-50%);
                    pointer-events: none;
                }
                .vol {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    margin: 0;
                    opacity: 0;
                    cursor: pointer;
                }
            `,
        ];
    }
}
