# PoLR-YTube-Media-Card

A collection of cards was design to enhance the features of the [YTube_Media_Player integration](https://github.com/KoljaWindeler/ytube_music_player) and the [Mini Media Player](https://github.com/kalkih/mini-media-player)

<img width="398" height="563" alt="image" src="https://github.com/user-attachments/assets/c8ade858-927f-4cc4-a505-700388d2b1e5" />
<img width="408" height="574" alt="image" src="https://github.com/user-attachments/assets/7785879b-c84b-49f2-bf43-c2fc490394b4" />




## Installation

### HACS

1. Open the HACS section of Home Assistant.
2. Click the "..." button in the top right corner and select "Custom Repositories."
3. In the window that opens paste this Github URL ([https://github.com/cash83/polr-ytube-media-card]).
4. Select "Lovelace"
5. In the window that opens when you select it click om "Install This Repository in HACS"

### Manually

1. Copy `polr-ytube-media-card.js` into your `<config>/<www>` folder
2. Add `polr-ytube-media-card.js` as a dashboard resource.

## PoLR-YTube-Playing-Card

Get the full experience of the ytube_music_player component! You can see what's currently playing, browse through suggestions, search, and access your library!

### Settings

-   `entity_id` - a YTube_Media_Player entity
-   `header` - title of the card
-   `coverNavigation` - `true/false` to have the "For You" section to use covers or a list to navigate. Defaults to false.

### Example

```
type: custom:polr-ytube-playing-card
entity_id: media_player.youtube_living_room_display
header: YouTube Music
```


<img width="398" height="563" alt="image" src="https://github.com/user-attachments/assets/deda6f79-7a92-47c2-bdb3-ad419bbb8f10" />

