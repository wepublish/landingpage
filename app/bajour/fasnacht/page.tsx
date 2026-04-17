
import HeaderImage from "./assets/header.webp";
import ReadyImage from "./assets/time.webp";
import IndependentImage from "./assets/independent.webp";
import FooterImage from "../assets/footer.webp";
import fasnachtLogo from "./assets/logo_white.svg";
import BajourLayoutLarge from "../components/bajour-layout-large";
import { resolveBajourConfig } from "../config";

import { Suspense } from "react";

export default function BaselBriefingWrapper() {
  return (
    <Suspense fallback={null}>
      <BaselBriefing />
    </Suspense>
  );
}

async function BaselBriefing() {
  const { tenant, listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: fasnachtLogo,
    title: "Fasnachts-Briefing",
    subtitle: "Deine fasnächtliche Grundversorgung",
    lead: "Du willst rund ums Jahr übers fasnächtliche Geschehen informiert sein, ohne alle Zeitungen und Online-Portale zu lesen?",
    wakeup: {
      intro: "Wir vom Fasnachts-Briefing-Team übernehmen das für dich. Wir lesen jede Zeile und schauen jede Sendung.",
      leadup: "",
      time: "",
      context: ""
    },
    ready: {
      intro: "im Fasnachts-Rhythmus",
      time: "",
      outro: ""
    },
    delivery: {
      intro: "Und schicken dir monatlich und rund um die Fasnacht auch häufiger die wichtigsten Fasnachts-News per E-Mail zu.",
      time: "",
      text: ""
    },
    subscribeText: "jetzt anmelden und immer<br />bestens informiert sein!",
    mainBackgroundColor: "#feeae3",
    leadColor: "black",
    images: {
      header: HeaderImage,
      ready: ReadyImage,
      independent: IndependentImage,
      footer: FooterImage,
    },
    formConfig: {
      autoFocus: false,
      interests: [fasnachtsBriefingId],
      steps: [
        {
          inputs: [
            {
              name: "EMAIL",
              label: "E-Mail",
              type: "email",
              required: true,
            },            
            {
              name: "VORNAME",
              label: "Vorname",
              type: "text",
              required: true,
            },
          {
              name: "NACHNAME",
              label: "Nachname",
              type: "text",
            }            
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
        { name: "UTM_CAMP", urlParam: "utm_campaign" },
        { name: "EMAIL", urlParam: "email" },
        { name: "VORNAME", urlParam: "vorname" },
        { name: "NACHNAME", urlParam: "nachname" },
        { name: "PLZ", urlParam: "plz" },
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas Kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=fasnachts-briefing-member&firstName=|*VORNAME*|&lastName=|*NACHNAME*|&mail=|*EMAIL*|",
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
      <BajourLayoutLarge {...briefingProps} />
    </>
  );
}
