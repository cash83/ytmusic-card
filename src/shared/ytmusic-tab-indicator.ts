import { TabIndicatorBase } from "@material/mwc-tab-indicator/mwc-tab-indicator-base";
import { styles } from "@material/mwc-tab-indicator/mwc-tab-indicator.css";
import { customElement } from "lit/decorators.js";

@customElement("ytmusic-tab-indicator")
export class YTMusicTabIndicator extends TabIndicatorBase {
    static override styles = [styles];
}

declare global {
    interface HTMLElementTagNameMap {
        "ytmusic-tab-indicator": YTMusicTabIndicator;
    }
}
