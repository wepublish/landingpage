import { GoogleAnalytics } from "@next/third-parties/google";


import HeaderImage from "./assets/header.webp";
import ReadyImage from "./assets/time.webp";
import IndependentImage from "./assets/independent.webp";
import FooterImage from "./assets/footer.webp";
import BajourLayoutLarge from "./components/bajour-layout-large";

export default function BaselBriefing() {
  const briefingProps = {
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
      interests: ["851436c80e", "22b72061f1"],
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
                { id: '088f8f7a77', name: '🏙️Basel-Briefing', description: "Das Wichtigste aus Basel!" },
                { id: '49a1cf05fb', name: '⚽FCB-Briefing', description: "Alles rund um den FCB." },
              ]
            }
          ],
        },
      ],
      listId: "47ed10ad9f",
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
