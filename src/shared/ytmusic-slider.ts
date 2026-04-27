import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ytmusic-slider")
export class YTMusicSlider extends LitElement {
    @property({ type: Number }) value: number = 0;
    @property({ type: Number }) min: number = 0;
    @property({ type: Number }) max: number = 100;
    @property({ type: Number }) step: number = 1;

    render() {
        return html`<ha-slider
            min=${this.min}
            max=${this.max}
            step=${this.step}
            .value=${this.value}
            @change=${(e: Event) => {
                this.value = (e.target as any).value;
                this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
            }}
        ></ha-slider>`;
    }

    static styles = css`
        :host {
            display: contents;
        }
        ha-slider {
            width: 100%;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ytmusic-slider": YTMusicSlider;
    }
}
