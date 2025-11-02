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
3. Starte die Entwicklungsumgebung:
   ```bash
   npm run dev
   ```
4. Öffne `http://localhost:3000/testBriefing`, um die Beispiel-Landingpage zu prüfen.
5. Optional: Interessensgruppen per Script holen, z. B. zur Konfiguration der `interests`:
   ```bash
   node scripts/get-group.js
   ```

## Add New Newsletter

### News Letter Configurations

### Update Mailchimp API Key

### Update Mailchimp List ID

### URL-Parameter konfigurieren
Die Formularlogik kann Werte aus der URL als `defaultValue` in die Inputs schreiben. Dafür müssen die Konfigurationen in `app/<slug>/page.tsx` (z. B. `app/testBriefing/page.tsx`) aufeinander abgestimmt sein:

- `steps` definiert alle sichtbaren oder versteckten Felder inklusive `name`, `type`, `required` und optionalem `defaultValue`.
- `urlData` ordnet einen Query-Parameter (`param`) exakt einem Eingabenamen (`input`) zu. Nur bei Namensgleichheit wird der Wert übernommen.

#### Umsetzung

1. Lege in `steps` alle Formularfelder an, die du brauchst (versteckte Inputs nutzen `type: "hidden"`).
2. Ergänze für jedes Feld einen Eintrag in `urlData`, z. B. `{ param: "email", input: "email" }`. So landet `?email=` automatisch im Feld `name: "email"`.
3. Starte lokal (`npm run dev`) und teste den Link, z. B. `http://localhost:3000/testBriefing?email=max@example.org&fname=Max`.
4. Setze bei Bedarf `defaultValue` im Input als Fallback, falls kein Parameter mitgeliefert wird.

#### Beispiel (`app/testBriefing/page.tsx`)

```ts
const briefingProps = {
  // …
  steps: [
    { stepId: "step1", inputs: [{ name: "email", type: "email", required: true }] },
    { stepId: "step2", inputs: [{ name: "lname", type: "text", required: true }] },
    { stepId: "step3", inputs: [{ name: "fname", type: "text", required: true }] },
  ],
  urlData: [
    { param: "email", input: "email" },
    { param: "fname", input: "fname" },
    { param: "lname", input: "lname" },
  ],
  // …
};
```

#### Hinweise

- Die UTM-Felder (`utm_source`, `utm_medium`, `utm_campaign`) werden unabhängig von `urlData` aus der URL gelesen und im Mailchimp-Request als Merge-Fields gespeichert. Trage sie nur in `urlData` ein, wenn du zusätzlich ein Formularfeld dafür benötigst.
- Prüfe bei neuen Feldern, ob das passende Mailchimp-Merge-Tag (z. B. `FNAME`, `LNAME`, `UTM_*`) gesetzt wird – idealerweise mit einem Testeintrag.

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
