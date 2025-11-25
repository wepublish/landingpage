This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Developer Docs

## Getting Started

1. Install the dependencies (Node 18+ recommended):
   ```bash
   npm install
   ```
2. Lege eine `.env` an und trage deinen Mailchimp-Key ein:
   ```bash
   cp .env.sample .env
   # Datei öffnen und MAILCHIMP_API_KEY setzen (Format: <key>-<server>)
   ```
   Ohne gültigen Key schlagen die Mailchimp-Scripts fehl.
3. Starte die Entwicklungsumgebung:
   ```bash
   npm run dev
   ```
4. Öffne `http://localhost:3000/testBriefing`, um die Beispiel-Landingpage zu prüfen.
5. Hole dir bei Bedarf die aktuellen Mailchimp-Daten (Interest-Gruppen & Merge-Felder) für deine Liste:
   ```bash
   npm run get-all-informartion
   ```
   Voraussetzung: `MAILCHIMP_API_KEY` ist gesetzt und du hast Netzwerkzugriff auf Mailchimp.

## Add New Newsletter

### News Letter Configurations

### Update Mailchimp API Key

### Update Mailchimp List ID

## Landingpages konfigurieren

### 1. Varianten pro Medium pflegen
- Für jedes Medium gibt es unter `components/<medium>LandingPages/` (z. B. `components/bajourLandingPages/`) bis zu drei vorbereitete Varianten: `landingPage.tsx`, `landingPageLight.tsx` und `landingPageSuperLight.tsx`.
- Jede Variante exportiert eine React-Komponente, die `BriefingProperties` erwartet und im Footer das gemeinsame `MailChimpForm` rendert. Dadurch kannst du den Formularfluss zentral verwalten und trotzdem pro Variante das Layout frei gestalten.
- Passe Texte, Farben, Bilder und Struktur direkt im JSX dieser Dateien an. Gestaltung passiert nicht mehr über Props, sondern innerhalb der jeweiligen Komponenten.
- Für neue Medien kopierst du einen bestehenden Komponenten-Ordner (z. B. `components/exampleLandingPages/`), benennst ihn um (`components/<deinMedium>LandingPages/`) und passt die drei Varianten nach Bedarf an. Achte darauf, Bildpfade, CSS-Klassen und Tracking-Skripte medium-spezifisch zu setzen.
- Beispiel: `components/bajourLandingPages/landingPage.tsx` importiert `MailChimpForm` aus `components/mailChimpForm.tsx` und verwendet `props.mailchimpFields`, `props.steps` usw., die du im jeweiligen `page.tsx` definierst.

### 2. Seite anlegen & Formular konfigurieren
- Lege für jedes Medium einen eigenen Ordner unter `app/` an (`app/<medium>/`, z. B. `app/bajour/` oder `app/example/`).
- Innerhalb des Medium-Ordners erzeugst du für jede Variante einen weiteren Ordner, der den Route-Slug widerspiegelt (z. B. `app/bajour/landingPage1/`, `app/bajour/landingPage2/`). In jeden dieser Ordner gehört eine `page.tsx`.
- Die URL ergibt sich aus der Ordnerstruktur: `app/bajour/landingPage1/page.tsx` wird unter `/bajour/landingPage1` ausgeliefert.
- Importiere in der jeweiligen `page.tsx` die gewünschte Variante, z. B. `import LandingPage from "@/components/bajourLandingPages/landingPage";`.
- Typischer Seitenaufbau:
  ```tsx
  import type { BriefingProperties } from "@/types/types";
  import LandingPage from "@/components/bajourLandingPages/landingPage";

  export default function BajourLandingPage1() {
    const briefingProps: BriefingProperties = { /* ... */ };
    return <LandingPage {...briefingProps} />;
  }
  ```
- Beispielhafte Struktur:
  ```text
  app/
  ├─ bajour/
  │  ├─ landingPage1/
  │  │  └─ page.tsx        → Route /bajour/landingPage1
  │  └─ landingPage2/
  │     └─ page.tsx        → Route /bajour/landingPage2
  └─ example/
     ├─ landingPage1/
     │  └─ page.tsx        → Route /example/landingPage1
     └─ landingPage2/
        └─ page.tsx        → Route /example/landingPage2

  components/
  └─ bajourLandingPages/
     ├─ landingPage.tsx
     ├─ landingPageLight.tsx
     └─ landingPageSuperLight.tsx
  ```
- Konfiguriere das `briefingProps` Objekt – es enthält nur noch Mailchimp-relevante Einstellungen:
  ```ts
  const briefingProps: BriefingProperties = {
    listId: "MAILCHIMP_LIST_ID",
    interests: ["groupIdA", "groupIdB"], // optionale Vorauswahl von Gruppen
    steps: [...],                         // Formular-Schritte
    mailchimpFields: [...],                // Zuordnung URL/Form -> Merge-Tags
    successUrl: "/danke",                 // Ziel nach erfolgreichem Submit
  };
  ```
- Übergebe die Props an deine Variante: `<LandingPage {...briefingProps} />`.
- Beispielkonfiguration mit mehreren Formular-Schritten:
  ```ts
  const briefingProps: BriefingProperties = {
    listId: process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID!,
    interests: ["47ed10ad9f", "22b72061f1"],
    steps: [
      {
        stepId: "kontakt",
        inputs: [
          { name: "email", label: "E-Mail", type: "email", required: true },
          { name: "fname", label: "Vorname", type: "text", required: true },
        ],
      },
      {
        stepId: "details",
        inputs: [
          { name: "lname", label: "Nachname", type: "text", required: true },
          { name: "phone", label: "Telefonnummer", type: "tel", required: false },
          { name: "birthday", label: "Geburtsdatum", type: "date", required: false },
          { name: "zip", label: "PLZ", type: "number", required: false },
        ],
      },
    ],
    mailchimpFields: [
      { param: "email", input: "EMAIL" },
      { param: "fname", input: "FNAME" },
      { param: "lname", input: "LNAME" },
      { param: "phone", input: "PHONE" },
      { param: "birthday", input: "BIRTHDAY" },
      { param: "zip", input: "PLZ" },
      { param: "utm_source", input: "UTM_SOURCE" },
    ],
    successUrl: "/danke",
  };
  ```

### 3. Formularfelder & URL-Parameter
- Alle Formularfelder werden in `steps` gepflegt. Der `name` wird als Feldname, `id` und `FormData`-Key verwendet.
- Wenn ein Query-Parameter das Feld vorausfüllen soll, muss der Parametername exakt dem `name` entsprechen (`?fname=Max` füllt das Feld mit `name: "fname"`).
- Für versteckte Felder einfach `type: "hidden"` setzen; das Feld ist dann nicht sichtbar, wird aber wie gewohnt übertragen.
- `urlData` verknüpft jeden Parameter (`param`) mit dem Mailchimp Merge-Tag (`input`). Sobald ein Wert im Formular oder in der URL vorhanden ist, landet er unter diesem Merge-Tag bei Mailchimp.
- Beispiel:
  ```ts
  urlData: [
    { param: "email", input: "EMAIL" },        // Formularfeld -> Merge-Tag
    { param: "utm_source", input: "UTM_SOURCE" } // nur URL -> Merge-Tag
  ];
  ```
- Sorge dafür, dass alle verwendeten Merge-Tags (`EMAIL`, `FNAME`, `PLZ`, `UTM_*` usw.) in deiner Mailchimp-Liste existieren – fehlende Tags führen zu API-Fehlern.
- Mailchimp stellt folgende Feldtypen bereit: Text, Nummer, Radio Buttons (Optionsfelder), Dropdown-Menü, Datum, Geburtsdatum, Adresse, Postleitzahl (nur USA), Telefonnummer, Website, Bild-URL. Im Projekt sind derzeit alle Typen außer Radio Buttons und Dropdown-Menüs einsatzbereit; für diese zwei Varianten müssen noch passende UI-Komponenten ergänzt werden.
- Über `urlData` kannst du beliebige Kampagnen-Metadaten direkt aus der URL übernehmen, ohne dafür Eingabefelder anzulegen. Beispiel: `{ param: "utm_source", input: "UTM_SOURCE" }`, `{ param: "utm_medium", input: "UTM_MEDIUM" }`, `{ param: "utm_campaign", input: "UTM_CAMP" }`. Sobald die Parameter in der URL stehen, werden die Werte an die hinterlegten Mailchimp Merge-Tags übertragen.

### 4. Mailchimp-Daten prüfen
- Führe `npm run get-all-informartion` aus, um Interest-Gruppen und Merge-Felder der aktuellen Liste einzusehen.
- Die Ausgabe hilft dir, das `interests` Array und die Merge-Tag-Namen in `urlData` abzugleichen.
- Beispielausgabe:
  ```text
  > npm run get-all-informartion

  > newsletter-landing-page@0.1.0 get-groups
  > node scripts/get-group.js

  ✅ Gruppen erfolgreich geladen:
  [
    { id: '47ed10ad9f', name: 'Gruppe A' },
    { id: '22b72061f1', name: 'Gruppe B' }
  ]

  > newsletter-landing-page@0.1.0 get-merge-fields
  > node scripts/get-merge-fields.js

  ✅ Merge-Felder für Liste 851436c80e:
  - BIRTHDAY (Birthday) – birthday [optional]
  - ADDRESS (Address) – address [optional]
  - PHONE (Phone Number) – phone [optional]
  - FNAME (First Name) – text [optional]
  - LNAME (Last Name) – text [optional]
  - MMERGE6 (Full Name) – text [optional]
  - PLZ (plz) – number [optional]
  - UTM_SOURCE (utm_source) – text [optional]
  - UTM_MEDIUM (utm_medium) – text [optional]
  - UTM_CAMP (utm_campaign) – text [optional]
  ```
- Trage die gewünschten Gruppen-IDs aus dem `get-groups` Abschnitt in `interests` ein (`app/<slug>/page.tsx`). Darüber steuerst du, für welche Mailchimp-Gruppe die Landingpage subscribt.
- Den Listen-Schlüssel (`listId`) findest du im Mailchimp-Interface (Audience → Settings → Audience name and defaults).

### 5. Testen
- Starte lokal (`npm run dev`) und öffne deine Seite, z. B. `http://localhost:3000/<slug>`.
- Hänge Testparameter an die URL (`?email=max@example.org&fname=Max&utm_source=Campaign`), um Prefills zu prüfen.
- Durchlaufe das Formular einmal komplett; nach erfolgreicher Anmeldung leitet der Client auf `successUrl` weiter.

# Usage Instructions

## Url Parameters
Mit einem speziellen Link kannst du das Formular schon vorausfüllen, bevor jemand auf der Landingpage landet. So geht’s:

1. Öffne die Zielseite, z. B. `https://example.com/testBriefing`.
2. Hänge die gewünschten Angaben als Parameter an, z. B. `?email=max@example.org&fname=Max&lname=Muster`.
3. Versende oder teile den kompletten Link. Die Felder E-Mail, Vorname und Nachname sind beim Öffnen schon ausgefüllt.

Hinweise für Kampagnen:

- Nutze zusätzlich `utm_source`, `utm_medium` und `utm_campaign`, damit dein Eintrag korrekt im Reporting auftaucht.
- Verwende keine Leerzeichen in den Werten. Ersetze sie durch `-` oder `%20` (d. h. `?fname=Max%20Mustermann`).
- Wenn du mehrere Links brauchst (z. B. für verschiedene Partner), kopiere den Link und passe nur die Werte hinter dem `=` an.
