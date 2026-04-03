# Landing Page

Dieses Repo erlaubt die einfache Erstellung von Landing Pages sowie die
Einbettung von dynamischen Mailchimp-Formularen.

## Getting Started

> **Bemerkung:** Dieses Projekt enthält die Konfiguration für einen Development-Container. Bei der Verwendung von Visual Studio Code mit der Dev-Container-Extension wird das Projekt in einem Development-Container geöffnet.

1. Bibliotheken installieren:
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

4. Öffne `http://localhost:3000/basel-briefing`, um die Beispiel-Landingpage zu prüfen.

## Entwicklung

1. Code aktualisieren
   ```bash
   git checkout main
   git pull
   ```

2. Branch erstellen
   ```bash
    git checkout -b mein-neues-feature
   ```

3. Programmieren

4. Committen und pushen
   ```bash
   git add .
   git commit -m "Meine Änderung"
   git push
   ```

5. Auf Github wird automatisch die Aufforderung angezeigt, einen Pull-Request
   zu öffnen. Sobald dieser eröffnet ist, wird dort auch die Testadresse angezeigt.

6. Wenn alles funktioniert: im Pull-Request auf "Merge" klicken.

## Konfiguration

Jedes Medium hat seinen eigenen Unterordner im Ordner `app`.

Die Seiten können die Komponente `MailchimpForm` verwenden, um das MC-Formular
einzubinden. Die möglichen Konfigurationsoptionen sind unten aufgelistet.

## Layouts und Pages

Das Frontend ist jeweils in ein Layout und eine Seite aufgeteilt. Im Layout wird
die Struktur der Seite mit Platzhaltern definiert. Die Seite enthält den Inhalt
der Seite und verwendet eines der Layouts. Die Layouts sind in `bajour-layout-large`,
`-medium` und `-small` abgelegt.

Das erlaubt, ein Layout für verschiedene Briefings zu verwenden, ohne Code allzu
stark duplizieren zu müssen.

## Mailchimp-Integration

Für die Verknüpfung des Formulars ist teilweise die Angabe interner
Mailchimp-IDs nötig. Diese auf der Website zu finden ist teilweise schwierig.

Einfacher geht es mit dem Befehl `npm run get-all-information`.

Damit werden alle möglichen Zielgruppen, Zielgruppenfelder sowie die
Interessensgruppen aufgelistet.

### IDs via Klarnamen auflösen

IDs werden nicht hartcodiert. In `app/bajour/config.ts` werden sie zentral
per Klarname aus Mailchimp aufgelöst. Neue Briefings dort eintragen und das
zurückgegebene ID-Objekt in den Page-Komponenten verwenden.

## Konfigurationsoptionen

### listId

Die Mailchimp-Zielgruppenliste. Wird in `app/bajour/config.ts` via Klarname
aufgelöst – kein Hartcodieren nötig.

```js
listId: "851436c80e"
```

### mailchimpFields

Eine Liste der Zielgruppenfelder, die vom Formular abgefragt werden können
mit dem zugehörigen URL-Parameter. Wenn beim Formularaufruf ein hier
konfigurierter Parameter gesetzt ist, wird die entsprechende Angabe automatisch
bei der ersten Möglichkeit mit Mailchimp synchronisiert.

```js
mailchimpFields: [
  { name: "UTM_SOURCE", urlParam: "utm_source" },
  { name: "UTM_MEDIUM", urlParam: "utm_medium" },
  { name: "UTM_CAMP", urlParam: "utm_campaign" },
  { name: "EMAIL", urlParam: "email" },
  { name: "FNAME", urlParam: "fname" },
  { name: "LNAME", urlParam: "lname" },
  { name: "PLZ", urlParam: "plz" },
]
```

### interests

Hier kann angegeben werden, zu welcher/n Interessensgruppen die Besucher/innen
automatisch hinzugefügt werden sollen, unabhängig davon, welche allenfalls
gegenteiligen Auswahlen die Besucher/innen später im Formular noch treffen.

Die IDs werden via `resolveBajourConfig()` aus `app/bajour/config.ts` bezogen.

```js
interests: [fcbBriefingId],
```

### steps

Definition der Schritte des Formulars. Schritte können mit
[skipIfFieldsFilled](#skipiffieldsfilled) und
[skipIfInterestsFilled](#skipifinterestsfilled) übersprungen werden.

Jeder Schritt besteht aus einem oder mehreren Eingabefeldern. Die Eingabefelder
müssen die folgenden Angaben enthalten:

* name: Der Name des Zielgruppenfeldes.

Optional können folgende Optionen konfiguriert werden:

* label: Die Beschriftung des Formularfelds.
* type: Der [Eingabetyp des Feldes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
* required: Ob das Feld obligatorisch ist.
* description: Ein Kurztext, der oberhalb des Feldes angezeigt wird.

```js
steps: [
  {
    inputs: [
      { name: "EMAIL", label: "E-Mail", type: "email", required: true },
      { name: "LNAME", label: "Nachname", type: "text", required: true },
      { name: "FNAME", label: "Vorname", type: "text", required: true }
    ]
  }, {
    inputs: [
      { description: "Interesse an Gemeindenews? Trage hier deine PLZ ein.",
        name: "PLZ", label: "Postleitzahl", type: "number", required: true },
    ]
  }
]
```

Der Eingabetyp "groups" ist den Interessensgruppen vorbehalten. Damit kann eine
Liste von Interessensgruppen angezeigt werden, die die Besucher aktivieren und
deaktivieren können. Für eine Liste der möglichen Interessensgruppen die
Anleitung unter [Mailchimp-Integration](#mailchimp-integration) befolgen.

```js
{
  inputs: [
    {
      description: "Bist du an weiteren News interessiert?",
      name: "Interessen",
      type: "groups" as const,
      options: [
        { id: '47ed10ad9f', name: 'Gruppe A', description: "Weitere Neuigkeiten zu deiner Stadt" },
        { id: '22b72061f1', name: 'Gruppe B', description: "Partyanlässe" },
        { id: '6d529bb42b', name: 'Gruppe C', description: "News zu Physik und Mathematik" }
      ]
    }
  ]
}
```

### showIfInterestsFilled

Definiert, ob der Schritt angezeigt werden soll, basierend auf den ausgewählten
Interessensgruppen. Andernfalls wird der Schritt übersprungen.

Alternativen:
* [skipIfInterestsFilled](#skipifinterestsfilled)
* [skipIfFieldsFilled](#skipiffieldsfilled)

```js
{
  showIfInterestsFilled: ["6d529bb42b"],
  inputs: [
    { name: "LNAME", label: "Nachname", required: true },
    { name: "FNAME", label: "Vorname", required: true },
  ],
}
```

### skipIfFieldsFilled

Definiert, ob der Schritt übersprungen werden soll, wenn die angegebenen Felder
schon gefüllt sind. Dabei wird nicht unterschieden, ob sie via URL-Parameter
oder in einem früheren Schritt gefüllt wurden.

* [skipIfInterestsFilled](#skipifinterestsfilled)
* [showIfInterestsFilled](#showifinterestsfilled)

```js
{
  skipIfFieldsFilled: ["FNAME", "LNAME"],
  inputs: [
    { name: "LNAME", label: "Nachname", required: true },
    { name: "FNAME", label: "Vorname", required: true },
  ],
}
```

### skipIfInterestsFilled

Definiert, ob der Schritt übersprungen werden soll, wenn die angegebenen
Interessensgruppen schon aktiviert sind. Dabei wird nicht unterschieden, ob sie
via Formularkonfiguration oder in einem früheren Schritt gefüllt wurden.

* [skipIfFieldsFilled](#skipiffieldsfilled)
* [showIfInterestsFilled](#showifinterestsfilled)

```js
{
  skipIfInterestsFilled: ["6d529bb42b"],
  inputs: [
    { name: "LNAME", label: "Nachname", required: true },
    { name: "FNAME", label: "Vorname", required: true },
  ],
}
```

### successUrl

Die URL gibt an, wohin die Besucher/innen geleitet werden sollen, wenn sie das
Formular vollständig ausgefüllt haben.

Die URL kann Platzhalter der Form `|*FELDNAME*|` enthalten, die automatisch
mit den Formulareingaben bzw. den URL-Daten ersetzt werden.

Alternative: [successPage](#successpage).

```js
successUrl: "https://bajour.ch/mitmachen?mail=|*EMAIL*|"
```

### successPage

Diese Information wird nach dem Ausfüllen des Formulars angezeigt und erlaubt,
den Besucher:innen eine letzte Auswahl in Form von Schaltflächen zu geben und
aufgrund dieser Wahl auf unterschiedliche Seiten weiterzuleiten.

Die URL kann Platzhalter der Form `|*FELDNAME*|` enthalten, die automatisch
mit den Formulareingaben bzw. den URL-Daten ersetzt werden.

Alternative: [successUrl](#successurl)

```js
successPage: {
  description: "Danke fürs Abonnieren! Möchtest du unabhängingen Journalismus finanziell unterstützen?",
  options: [
    {
      label: "Ja!",
      background: "#008b0eff",
      url: "https://bajour.ch/mitmachen?mail=|*EMAIL*|"
    }, {
      label: "Zur Startseite",
      background: "#bfbfbfff",
      url: "https://bajour.ch"
    }
  ]
}
```

## Beispiel

```js
{
  interests: ["47ed10ad9f", "22b72061f1"],
  steps: [{
    inputs: [
      { name: "EMAIL", label: "E-Mail", type: "email", required: true }
    ]
  }, {
    skipIfFieldsFilled: ["FNAME", "LNAME"],
    inputs: [
      { name: "LNAME", label: "Nachname", required: true },
      { name: "FNAME", label: "Vorname", required: true },
    ],
  }, {
    inputs: [{
      description: "Interesse an Gemeindenews? Trage hier deine PLZ ein.",
      name: "PLZ",
      label: "Postleitzahl",
      type: "number",
      required: true,
    }]
  }],
  listId: "851436c80e",
  mailchimpFields: [
    { name: "UTM_SOURCE", urlParam: "utm_source" },
    { name: "UTM_MEDIUM", urlParam: "utm_medium" },
    { name: "UTM_CAMP", urlParam: "utm_campaign" },
    { name: "EMAIL", urlParam: "email" },
    { name: "FNAME", urlParam: "fname" },
    { name: "PLZ", urlParam: "plz" },
  ],
  successUrl: "https://bajour.ch/mitmachen?mail=|*EMAIL*|",
}
```
## Anwendung

URL mit allen möglichen Infos, die über Parameter übergeben werden können: https://briefing.bajour.ch/fasnacht?vorname=Samuel&nachname=Hufschmid&email=shufschmid@gmail.com&plz=4052&utm_source=kino&utm_medium=diashow&utm_campaign=osterhase

Einzelne Ansichten werden folgendermassen angesteuert: 

## Live-Seiten

| Briefing | Standard | Mini | Light |
|---|---|---|---|
| Basel | [briefing.bajour.ch](https://briefing.bajour.ch) | [/mini](https://briefing.bajour.ch/mini) | [/light](https://briefing.bajour.ch/light) |
| FCB | [briefing.bajour.ch/fcb](https://briefing.bajour.ch/fcb) | [/fcb/mini](https://briefing.bajour.ch/fcb/mini) | [/fcb/light](https://briefing.bajour.ch/fcb/light) |
| Fasnacht | [briefing.bajour.ch/fasnacht](https://briefing.bajour.ch/fasnacht) | [/fasnacht/mini](https://briefing.bajour.ch/fasnacht/mini) | [/fasnacht/light](https://briefing.bajour.ch/fasnacht/light) |

- Basel Briefing: [https://briefing.bajour.ch?email=max.muster%40example.com&vorname=Max&nachname=Muster&plz=4001](https://briefing.bajour.ch?email=max.muster%40example.com&vorname=Max&nachname=Muster&plz=4001)
- FCB-Briefing / mini: [https://briefing.bajour.ch/fcb/mini?utm_source=newsletter&utm_medium=email](https://briefing.bajour.ch/fcb/mini?utm_source=newsletter&utm_medium=email)
- Fasnachts-Briefing / light: [https://briefing.bajour.ch/fasnacht/light?utm_campaign=fasnacht25](https://briefing.bajour.ch/fasnacht/light?utm_campaign=fasnacht25)

