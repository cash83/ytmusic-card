import { LitElement, html, nothing } from "lit";
import { state } from "lit/decorators.js";

function editorLang(): "it" | "en" {
    const lang = (navigator.language || "en").toLowerCase();
    return lang.startsWith("it") ? "it" : "en";
}

// Boolean feature flags shown as switches. All default ON, so we fill defaults
// into the form data to keep the switches in sync with the real behavior.
const BOOL_FLAGS = ["show_search", "show_queue", "queue_actions", "enqueue_menu", "media_browser", "players", "show_chips", "cover_animation", "cover_glow"];

const LABELS: Record<string, Record<string, string>> = {
    it: {
        entity_id: "Entità (media player)",
        header: "Titolo",
        speakers: "Casse mostrate (vuoto = tutte)",
        show_search: "Mostra tasto Cerca",
        show_queue: "Mostra tab In coda",
        queue_actions: "Azioni sulla coda (sposta/rimuovi)",
        enqueue_menu: "Menu Aggiungi/Riproduci (ricerca e categorie)",
        media_browser: "Browser avanzato (Consigliati/Recenti/Libreria)",
        players: "Casse multi-room (raggruppa + volume)",
        show_chips: "Mostra chip categorie",
        cover_animation: "Anima copertina (ondeggia)",
        cover_glow: "Alone colorato dietro la copertina",
        anim_speed: "Velocità animazione copertina (secondi)",
        glow_size: "Dimensione alone (%)",
    },
    en: {
        entity_id: "Entity (media player)",
        header: "Header",
        speakers: "Shown players (empty = all)",
        show_search: "Show search button",
        show_queue: "Show queue tab",
        queue_actions: "Queue actions (move/remove)",
        enqueue_menu: "Add/Play menu (search & categories)",
        media_browser: "Advanced browser (Recommendations/Recent/Library)",
        players: "Multi-room players (group + volume)",
        show_chips: "Show category chips",
        cover_animation: "Animate cover (undulate)",
        cover_glow: "Colored halo behind the cover",
        anim_speed: "Cover animation speed (seconds)",
        glow_size: "Halo size (%)",
    },
};

export class YTMusicPlayingCardEditor extends LitElement {
    @state() private _config: any = {};
    @state() private _hass: any;

    public setConfig(config: any): void {
        this._config = config || {};
    }

    public set hass(hass: any) {
        this._hass = hass;
    }
    public get hass() {
        return this._hass;
    }

    private get _schema() {
        return [
            { name: "entity_id", required: true, selector: { entity: { domain: "media_player" } } },
            { name: "header", selector: { text: {} } },
            { name: "speakers", selector: { entity: { domain: "media_player", multiple: true } } },
            ...BOOL_FLAGS.map((name) => ({ name, selector: { boolean: {} } })),
            { name: "anim_speed", selector: { number: { min: 2, max: 15, step: 0.5, mode: "box", unit_of_measurement: "s" } } },
            { name: "glow_size", selector: { number: { min: 60, max: 160, step: 5, mode: "box", unit_of_measurement: "%" } } },
        ];
    }

    // Data passed to ha-form: fill boolean defaults (missing === true) so the
    // switches reflect the actual on-by-default behavior.
    private get _data() {
        const data: any = { ...this._config };
        for (const f of BOOL_FLAGS) data[f] = this._config[f] !== false;
        data.anim_speed = this._config.anim_speed ?? 6;
        data.glow_size = this._config.glow_size ?? 100;
        return data;
    }

    private _computeLabel = (schema: any): string => {
        return LABELS[editorLang()][schema.name] ?? schema.name;
    };

    private _valueChanged(ev: CustomEvent): void {
        ev.stopPropagation();
        const config = { ...ev.detail.value };
        this.dispatchEvent(
            new CustomEvent("config-changed", {
                detail: { config },
                bubbles: true,
                composed: true,
            }),
        );
    }

    protected render() {
        if (!this._hass) return nothing;
        return html`
            <ha-form
                .hass=${this._hass}
                .data=${this._data}
                .schema=${this._schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }
}

customElements.define("ytmusic-playing-card-editor", YTMusicPlayingCardEditor);
