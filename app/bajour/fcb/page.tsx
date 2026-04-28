
import HeaderImage from "./assets/header.webp";
import ReadyImage from "./assets/time.webp";
import IndependentImage from "./assets/independent.jpg";
import FooterImage from "./assets/footer.jpg";
import fcbLogo from "./assets/logo_white.svg";
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
    logo: fcbLogo,
    title: "FCB-Briefing",
    subtitle: "Das Wichtigste vor jedem Spiel",
    lead: "Du willst gut informiert an den FCB-Match, hast aber keine Lust, dich durch Zeitungen und Online-Portale zu pflügen?",
    wakeup: {
      intro: "Wir vom FCB-Briefing-Team übernehmen das für dich. Wir lesen jede Zeile und hören jeden Podcast.",
      leadup: "",
      time: "",
      context: ""
    },
    ready: {
      intro: "",
      time: "",
      outro: "Jeden Spieltag"
    },
    delivery: {
      intro: "Und schicken dir an jedem Spieltag die Wichtigsten Infos einige Stunden vor Anpfiff per E-Mail zu.",
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
      interests: [fcbBriefingId],
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
        { name: "UTM_CAMPAI", urlParam: "utm_campaign" },
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
            url: "https://bajour.ch/mitmachen?firstName=|*VORNAME*|&lastName=|*NACHNAME*|&mail=|*EMAIL*|&memberPlanBySlug=fcb-briefing-member",
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
