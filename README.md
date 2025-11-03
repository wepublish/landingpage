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

### 1. Seite anlegen
- Lege unter `app/<slug>/page.tsx` eine neue Datei an (z. B. `app/testBriefing/page.tsx` kopieren).
- Passe Inhalte, Farben und Bilder direkt im `briefingProps` Objekt an.
- Setze `listId` auf die gewünschte Mailchimp Audience.
- Trage im Array `interests` die IDs der Mailchimp-Interest-Gruppen ein, die automatisch aktiviert werden sollen.

### 2. Formularfelder & URL-Parameter
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

### 3. Mailchimp-Daten prüfen
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

### 4. Testen
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
