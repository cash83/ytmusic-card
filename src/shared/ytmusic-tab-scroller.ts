import { TabScrollerBase } from "@material/mwc-tab-scroller/mwc-tab-scroller-base";
import { styles } from "@material/mwc-tab-scroller/mwc-tab-scroller.css";
import { customElement } from "lit/decorators.js";

@customElement("ytmusic-tab-scroller")
export class YTMusicTabScroller extends TabScrollerBase {
    static override styles = [styles];
}

declare global {
    interface HTMLElementTagNameMap {
        "ytmusic-tab-scroller": YTMusicTabScroller;
    }
}
