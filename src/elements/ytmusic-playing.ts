import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../elements/ytmusic-list";
import { YTMusicList } from "../elements/ytmusic-list";
import { FetchableMediaContentType, YTMusicListState } from "../utils/utils";

@customElement("ytmusic-playing")
export class YTMusicPlaying extends LitElement {
    @state() public _hass: any;
    @state() public _entity: any;
    @state() private _polrYTubeList: YTMusicList;

    protected firstUpdated(_changedProperties): void {
        this._polrYTubeList = this.renderRoot.querySelector("ytmusic-list");
        this._getCurrentlyPlayingItems();
    }

    render() {
        return html`
            <ytmusic-list
                .hass=${this._hass}
                .entity=${this._entity}
            ></ytmusic-list>
        `;
    }

    async _getCurrentlyPlayingItems() {
        let media_content_type = this._entity?.attributes?.media_content_type;
        let _media_type = this._entity?.attributes?._media_type;
        let results: any = {};
        if (this._entity?.state == "idle") return;

        try {
            if (
                FetchableMediaContentType.includes(media_content_type) &&
                !["album"].includes(_media_type)
            ) {
                results = await this._hass.callWS({
                    type: "media_player/browse_media",
                    entity_id: this._entity["entity_id"],
                    media_content_type: "cur_playlists",
                    media_content_id: "",
                });
            }

            // Treat songs as a playlist
            if (["album"].includes(_media_type)) {
                results = await this._hass.callWS({
                    type: "media_player/browse_media",
                    entity_id: this._entity?.entity_id,
                    media_content_type: "album_of_track",
                    media_content_id: "1",
                });

                results?.children?.map((r: any, index: number) => {
                    r["media_content_type"] = "PLAYLIST_GOTO_TRACK";
                    r["media_content_id"] = index + 1;
                    return r;
                });
            }

            if (this._entity?.attributes?.media_title == "loading...") {
                this._polrYTubeList.state = YTMusicListState.LOADING;
                return;
            }

            if (results?.children?.length > 0) {
                this._polrYTubeList.elements = results.children;
                this._polrYTubeList.state = YTMusicListState.HAS_RESULTS;
            } else {
                //this._polrYTubeList.elements = [];
                //this._polrYTubeList.state = YTMusicListState.NO_RESULTS;
            }
            this.requestUpdate();
        } catch (e) {
            console.error(e);
            this._polrYTubeList.state = YTMusicListState.ERROR;
        }
    }

    public refresh(entity) {
        if (entity != null) this._entity = entity;
        this._getCurrentlyPlayingItems();
    }

    static styles = css``;
}
