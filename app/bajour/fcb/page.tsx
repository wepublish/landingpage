import { GoogleAnalytics } from "@next/third-parties/google";

import HeaderImage from "./assets/header.webp";
import ReadyImage from "./assets/time.webp";
import IndependentImage from "./assets/independent.webp";
import FooterImage from "./assets/footer.webp";
import fcbLogo from "./assets/logo_white.svg";
import BajourLayoutLarge from "../components/bajour-layout-large";
import { resolveBajourConfig } from "../config";

export default async function BaselBriefing() {
  const { listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

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
              name: "LNAME",
              label: "Nachname",
              type: "text",
              required: true,
            },
            {
              name: "FNAME",
              label: "Vorname",
              type: "text",
              required: true,
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
      listId,
      // input muss mit mailchimp Zielgruppenfelder übereinstimmen
      mailchimpFields: [
        { name: "UTM_SOURCE", urlParam: "utm_source" },
        { name: "UTM_MEDIUM", urlParam: "utm_medium" },
        { name: "UTM_CAMP", urlParam: "utm_campaign" },
        { name: "EMAIL", urlParam: "email" },
        { name: "FNAME", urlParam: "fname" },
        { name: "LNAME", urlParam: "lname" },
        { name: "PLZ", urlParam: "plz" },
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas Kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?firstName=|*VORNAME*|&mail=|*EMAIL*|&memberPlanBySlug=fcb-briefing-member",
          },
          {
            label: "Nein",
            background: "#bfbfbfff",
            url: "https://bajour.ch/a/i-basel",
          },
        ],
      },
    },
  };

  return (
    <>
      <BajourLayoutLarge {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
