
import fcbLogo from "../assets/logo_black.svg";
import bajourIphone from "../assets/bajour-iphone.png";
import BajourLayoutSmall from "../../components/bajour-layout-small";
import { resolveBajourConfig } from "../../config";

export default async function BaselBriefingSuperlight() {
  const { tenant, listId, baselBriefingId, fasnachtsBriefingId, fcbBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: fcbLogo,
    title: "Das Wichtigste rund um den FCB",
    subtitle: "Gut informiert ins Stadion (oder zumindest in der Kaffeepause mitreden): Hol dir das FCB-Briefing mit den wichtigsten News, Geschichten und Tipps rund um rotblau♥️💙. Kuratiert von Spezialist*innen – gelesen in 5 Minuten.",
    image: bajourIphone,
    listItems: [
      "Die wichtigsten FCB-News",
      "unabhängig und kostenlos",
      "Gewinne ein Saison-Abo",
      "erscheint vor jedem Spiel",
      "Für Fans und zum Mitreden",
    ],
    subscriberCountBold: "14'907",
    subscriberCountText: "Basler*innen lesen schon mit.",
    testimonials: [
      {
        quote: "Endlich weiss ich vor dem Spiel, worüber alle reden. Das FCB-Briefing ist meine Pflichtlektüre auf dem Weg ins Stadion.",
        author: "Marco (Breite)",
      },
      {
        quote: "Ich bin keine riesige Fussball-Expertin, aber das Briefing erklärt alles so, dass ich bei Gesprächen im Büro locker mithalte.",
        author: "Yasmin (Gundeli)",
      },
      {
        quote: "Kompakt, informativ und ohne Bullshit. Genau das, was ich vor einem FCB-Match brauche.",
        author: "Patrick (Muttenz)",
      },
    ],
    formConfig: {
      autoFocus: true,
      interests: [fcbBriefingId],
      steps: [
        {
          inputs: [
            {
              name: "EMAIL",
              label: "E-Mail",
              type: "email",
              required: true,
            }
          ],
        },
        {skipIfFieldsFilled: ["VORNAME"],
          inputs: [
            {
              name: "VORNAME",
              label: "Wie dürfen wir dich ansprechen (Vorname)?",
              required: true,
            },
          ],
        },
        {
          inputs: [
            {
              description: "Wir haben noch weitere Briefings zu Spezialthemen im Angebot. Interessiert?",
              type: "groups" as const,
              options: [
                { id: baselBriefingId, name: '🏙️Basel-Briefing', description: "Das Wichtigste aus Basel!" },
                { id: fasnachtsBriefingId, name: '🎉Fasnachts-Briefing', description: "Alles rund um die Basler Fasnacht." },
              ]
            }
          ],
        },
      ],
      tenant,
      listId,
      // input muss mit mailchimp Zielgruppenfelder übereinstimmen
      mailchimpFields: [
        { name: "UTM_SOURCE", urlParam: "utm_source" },
        { name: "UTM_MEDIUM", urlParam: "utm_medium" },
        { name: "UTM_CAMP", urlParam: "utm_campaign" },
        { name: "EMAIL", urlParam: "email" },
        { name: "VORNAME", urlParam: "vorname", defaultValue: "Leser*in" },
        { name: "NACHNAME", urlParam: "nachname" },
        { name: "PLZ", urlParam: "plz" },
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas Kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=fcb-briefing-member&firstName=|*VORNAME*|&mail=|*EMAIL*|",
          },
          {
            label: "Nein",
            background: "#bfbfbfff",
            url: "https://bajour.ch/willkommen-briefing",
          },
        ],
      },
    },
  };

  return (
    <>
      <BajourLayoutSmall {...briefingProps} />
    </>
  );
}
