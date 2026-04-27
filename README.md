# YTMusic Card

A collection of cards designed to enhance the features of the [YTube_Media_Player integration](https://github.com/KoljaWindeler/ytube_music_player) and the [Mini Media Player](https://github.com/kalkih/mini-media-player)

![YTMusic Card](https://raw.githubusercontent.com/cash83/ytmusic-card/main/img/ytmusic-browse.png)

![YTMusic Queue](https://raw.githubusercontent.com/cash83/ytmusic-card/main/img/ytmusic-queue.png)





## Installation

### HACS

1. Open the HACS section of Home Assistant.
2. Click the "..." button in the top right corner and select "Custom Repositories."
3. In the window that opens paste this Github URL ([https://github.com/cash83/ytmusic-card]).
4. Select "Lovelace"
5. In the window that opens when you select it click om "Install This Repository in HACS"

### Manually

1. Copy `ytmusic-card.js` into your `<config>/<www>` folder
2. Add `ytmusic-card.js` as a dashboard resource.

## YTMusic-Playing-Card

Get the full experience of the ytube_music_player component! You can see what's currently playing, browse through suggestions, search, and access your library!

### Settings

-   `entity_id` - a YTube_Media_Player entity
-   `header` - title of the card
-   `coverNavigation` - `true/false` to have the "For You" section to use covers or a list to navigate. Defaults to false.

### Example

```yaml
type: custom:ytmusic-playing-card
entity_id: media_player.youtube_living_room_display
header: YouTube Music
```

![YTMusic Playing Card](https://raw.githubusercontent.com/cash83/ytmusic-card/main/img/ytmusic-playlist.png)

## YTMusic-Search-Card

Search YouTube Music directly from your dashboard.

### Settings

-   `entity_id` - a YTube_Media_Player entity

### Example

```yaml
type: custom:ytmusic-search-card
entity_id: media_player.youtube_living_room_display
```
