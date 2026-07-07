# YTMusic Card

A YouTube-Music-styled "now playing" card that works with **both** the [YTube_Media_Player integration](https://github.com/KoljaWindeler/ytube_music_player) **and [Music Assistant](https://www.music-assistant.io/)** — the card **auto-detects** which one the entity belongs to and adapts accordingly.

The **YTMusic Playing Card** is a full "now playing" player with a YouTube-Music look: an undulating cover that breathes while playing, a wavy animated progress bar, big red transport controls, shuffle/repeat, a volume pill, and quick-access **category chips** that open a translucent popup with that category's music, plus a **search** with type filters.

<p align="center">
  <img src="img/ytmusic-player-new.svg" width="300" alt="Now Playing">
  &nbsp;&nbsp;
  <img src="img/ytmusic-popup-new.svg" width="300" alt="Category popup">
</p>

## Compatibility

The card **auto-detects** the media player type from the entity and adapts:

- **YouTube Music** (`ytube_music_player`): now-playing player, curated category chips (For You / Quick picks / From the community / Radio / Playlists / Recent), search with type filters, and the play **queue**.
- **Music Assistant** (`app_id: music_assistant`): now-playing player, your MA **library** categories (Tracks / Playlists / Radio, localized), and native MA **search** (`music_assistant.search`) with type filters. *(The play queue and the Discover/recommendation feeds live inside the Music Assistant app and are not exposed through Home Assistant, so they are hidden when the card is used with a Music Assistant player.)*

Just point `entity_id` at either a `ytube_music_player` entity or a Music Assistant `media_player` entity — no extra configuration needed.





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

The full "now playing" experience for ytube_music_player: current track with an undulating cover, wavy progress bar, transport controls, shuffle/repeat and volume — plus category chips that open a popup to jump into your suggestions and library.

### Settings

-   `entity_id` - a `ytube_music_player` **or** a Music Assistant `media_player` entity (auto-detected)
-   `header` - title of the card
-   `coverNavigation` - `true/false` to have the "For You" section to use covers or a list to navigate. Defaults to false.

### Example

```yaml
type: custom:ytmusic-playing-card
entity_id: media_player.youtube_living_room_display
header: YouTube Music
```

![YTMusic Playing Card](img/ytmusic-popup-new.svg)

## YTMusic-Search-Card

Search YouTube Music directly from your dashboard.

### Settings

-   `entity_id` - a YTube_Media_Player entity

### Example

```yaml
type: custom:ytmusic-search-card
entity_id: media_player.youtube_living_room_display
```
