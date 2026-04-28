
import bajourIphone from "../assets/bajour-iphone.png";
import fasnachtLogo from "../assets/logo_black.svg";
import BajourLayoutSmall from "../../components/bajour-layout-small";
import { resolveBajourConfig } from "../../config";

import { Suspense } from "react";

export default function BaselBriefingSuperlightWrapper() {
  return (
    <Suspense fallback={null}>
      <BaselBriefingSuperlight />
    </Suspense>
  );
}

async function BaselBriefingSuperlight() {
  const { tenant, listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: fasnachtLogo,
    title: "Das Wichtigste zur Fasnacht",
    subtitle: "Du willst rund ums Jahr übers fasnächtliche Geschehen informiert sein, ohne alle Zeitungen und Online-Portale zu lesen? Dann ist das Fasnachts-Briefing genau das Richtige für dich!",
    image: bajourIphone,
    listItems: [
      "Alle Fasnachts-News",
      "unabhängig und kostenlos",
      "Nützlich dank Insider-Tipps",
      "erscheint 12x im Jahr",
      "Für Aktive und zum Mitreden",
    ],
    subscriberCountBold: "14'907",
    subscriberCountText: "Basler*innen lesen schon mit.",
    testimonials: [
      {
        quote: "Das Fasnachts-Briefing ist kurz und prägnant. Sozusagen das Wichtigste zur Fasnacht in Kürze. Perfekt für die kurze Zugfahrt zur Arbeit!!",
        author: "Salome (Bruderholz)",
      },
      {
        quote: "Ich freue mich jedes Mal aufs Briefing und bin gespannt, was es rund um die Fasnacht zu berichten gibt.",
        author: "Moritz (Gelterkinden)",
      },
      {
        quote: "Das Fasnachts-Briefing gibt mir die Möglichkeit, mitreden zu können – ob Cliquen, Sujets oder Insider-Tipps. Makes me feel part of Basel!",
        author: "Sarah (Gellert)",
      },
    ],
    formConfig: {
      autoFocus: true,
      interests: [fasnachtsBriefingId],
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
                { id: fcbBriefingId, name: '⚽FCB-Briefing', description: "Up to date vor jedem Spiel." },
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
        { name: "UTM_CAMPAI", urlParam: "utm_campaign" },
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
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=fasnachts-briefing-member&firstName=|*VORNAME*|&mail=|*EMAIL*|",
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
