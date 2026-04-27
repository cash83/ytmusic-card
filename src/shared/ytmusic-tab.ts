import { __decorate } from "tslib";
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { TabBase } from "@material/mwc-tab/mwc-tab-base";
import { styles } from "@material/mwc-tab/mwc-tab.css";
import "./ytmusic-tab-indicator";

@customElement("ytmusic-tab")
export class YTMusicTab extends TabBase {
    renderIndicator() {
        return html`<ytmusic-tab-indicator
            .icon="${this.indicatorIcon}"
            .fade="${this.isFadingIndicator}"></ytmusic-tab-indicator>`;
    }

    static override styles = [styles];
}

declare global {
    interface HTMLElementTagNameMap {
        "ytmusic-tab": YTMusicTab;
    }
}

__decorate(
    [query("ytmusic-tab-indicator")],
    TabBase.prototype,
    "tabIndicator",
    void 0
);
