# DragonDex - Web-Advanced-DragonBall-TalhaM

**DragonDex** is een interactieve Single Page Application (SPA) gebouwd voor het vak *Advanced Web* (Dynamic Web). De applicatie maakt gebruik van de officiële Dragon Ball API om gebruikers de rijke wereld van Dragon Ball te laten verkennen. Gebruikers kunnen personages zoeken, filteren op eigenschappen, sorteren op kracht of naam, en hun favoriete vechters opslaan in een persoonlijke collectie.

---

## 🚀 Projectbeschrijving & Functionaliteiten

De applicatie integreert alle vereiste aspecten van moderne front-end webontwikkeling in een visueel aantrekkelijke en responsieve interface.

### Functionele kenmerken:
- **Dataverzameling & -weergave:** Haalt live data op van de Dragon Ball API. De personages worden getoond in een grid met animaties (`IntersectionObserver`). Wanneer je op een personage klikt, opent een modaal venster met uitgebreide details (zoals planeet en transformaties).
- **Interactiviteit:** - Live zoekfunctie op naam.
  - Uitgebreide filters (op ras, geslacht en affiliatie).
  - Sorteermogelijkheden (bijv. op Base Ki of alfabetisch).
- **Personalisatie:** - Gebruikers kunnen personages toevoegen aan hun favorieten.
  - Een Dark/Light mode Theme Switcher.
  - Zowel favorieten als het gekozen thema blijven bewaard tussen browsersessies dankzij `LocalStorage`.
- **Gebruikerservaring:** Volledig responsive design, "Skeleton loading" states tijdens het ophalen van data, en vloeiende CSS-animaties.

---

## 🛠️ Technische Vereisten & Documentatie

Hieronder staat een exact overzicht van hoe en waar de verplichte JavaScript-concepten zijn toegepast in de applicatie.

### 1. DOM Manipulatie
| Onderdeel | Beschrijving van implementatie | Locatie in code |
| :--- | :--- | :--- |
| **Elementen selecteren** | Selecteren van elementen zoals `characters-grid` en de `modal-container` via `getElementById`. | `ui.js` (regel 4 & 5) |
| **Elementen manipuleren** | De DOM updaten via `innerHTML` (voor kaarten en modal) en het manipuleren van klassen via `classList`. | `ui.js` (regel 26 & 39) |
| **Events aan elementen koppelen** | Koppelen van `input`, `change` en `click` events aan o.a. de zoekbalk en het filtermenu. | `main.js` (regel 35, 46, 54) |

### 2. Modern JavaScript
| Onderdeel | Beschrijving van implementatie | Locatie in code |
| :--- | :--- | :--- |
| **Gebruik van constanten** | Strikt gebruik van `const` voor statische waarden, zoals het API-endpoint. | `api.js` (regel 1) |
| **Template literals** | Interpolatie van variabelen (bijv. image/naam) voor de HTML-opbouw van de kaarten met backticks (`` ` ``). | `characterCard.js` (regel 6-21) |
| **Iteratie over arrays** | Gebruik van `.forEach()` voor het itereren over Intersection Observer entries. | `ui.js` (regel 13) |
| **Array methodes** | Gebruik van `.filter()` om personages te zoeken en `.sort()` om te sorteren. | `filters.js` (regel 12 & 56) |
| **Arrow functions** | Functies zoals `fetchCharacters = async (limit) => { ... }` gedefinieerd als pijltjesfuncties. | `api.js` (regel 8) |
| **Conditional (ternary) operator** | Conditionele toewijzing bij het instellen van de favorieten-klasse: `isFavorite ? 'favorite-active' : ''`. | `characterCard.js` (regel 4) |
| **Callback functions** | Callbacks meegegeven aan event listeners, zoals bij het sorteren of filteren. | `main.js` (regel 46) |
| **Promises** | Het wachten op en afhandelen van data (`fetch` retourneert een Promise). | `api.js` (regel 8 & 30) |
| **Async & Await** | Gestructureerde asynchrone API-aanroepen via `await fetch(...)` en `await response.json()`. | `api.js` (regel 10 & 16) |
| **Observer API** | `IntersectionObserver` toegepast om kaarten met een fade-in te animeren wanneer ze in beeld scrollen. | `ui.js` (regel 12-19) |

### 3. Data & API
| Onderdeel | Beschrijving van implementatie | Locatie in code |
| :--- | :--- | :--- |
| **Fetch om data op te halen** | Fetch API gebruikt om de basislijst én specifieke ID-details (transformaties/planeet) op te halen. | `api.js` (regel 10 & 32) |
| **JSON manipuleren en weergeven** | Parsen van de response naar bruikbare objecten via `response.json()` en deze mappen in de UI. | `api.js` (regel 16 & 37) |

### 4. Opslag & Validatie
| Onderdeel | Beschrijving van implementatie | Locatie in code |
| :--- | :--- | :--- |
| **Formulier validatie** | Invoercontrole in de zoekfunctie door `.trim()` te gebruiken en te checken of deze leeg is. | `filters.js` (regel 9) |
| **Gebruik van LocalStorage** | Opslaan van de favorieten ID-array en het geselecteerde applicatie-thema (dark/light). | `storage.js` (regel 28) & `theme.js` (regel 17) |

### 5. Styling & Layout
- **CSS Grid:** Toegepast op `.grid-container` voor de character kaarten (`cards.css`, regel 2).
- **Flexbox:** Gebruikt in o.a. de navbar en layout uitlijning (`style.css`, regel 55 & 96).
- **Gebruiksvriendelijke elementen:** Hover-animaties, custom scrollbars, laadskeletons (`skeleton-loading`) en interactieve hart-icoontjes voor favorieten.

### 6. Tooling & Structuur
Het project is opgebouwd met **Vite** en maakt gebruik van ES Modules. De bestanden zijn gescheiden in logische mappen:
```text
├── index.html            # Main entry file
├── package.json          # Dependencies & Scripts
├── vite.config.js        # Vite build configuratie
├── public/               # Statische bestanden
└── src/                  # Broncode map
    ├── css/              # Alle losse CSS stylesheets
    ├── js/               # Modulaire logica (api.js, filters.js, storage.js, ui.js)
    ├── components/       # UI componenten (characterCard.js, modal.js)
    └── main.js           # Core JS entrypoint


💻 Installatiehandleiding

Volg deze stappen om het project lokaal te installeren en te draaien:

    Kloon de repository:
    Bash

    git clone [https://github.com/Talha-M-Ehb/Web-Advanced-DragonBall-TalhaM.git](https://github.com/Talha-M-Ehb/Web-Advanced-DragonBall-TalhaM.git)
    cd Web-Advanced-DragonBall-TalhaM

    Installeer de afhankelijkheden:
    Zorg dat Node.js geïnstalleerd is en draai:
    Bash

    npm install

    Start de ontwikkelomgeving (Vite):
    Bash

    npm run dev

    Open de gegenereerde link (standaard http://localhost:5173) in je browser.

    Project bouwen voor productie:
    Bash

    npm run build

    📜 Licentie
        Dit project is beschikbaar onder de MIT License. Copyright (c) 2026 Talha-M-Ehb.

📚 Gebruikte Bronnen

    Vite Documentation: https://vite.dev/

    Dragon Ball API: https://web.dragonball-api.com/

    Documentatie en concepten via MDN Web Docs.

    AI Chatlog: https://gemini.google.com/share/e64b7051622e / https://gemini.google.com/share/047af52b90dc