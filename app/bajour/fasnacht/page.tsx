import { GoogleAnalytics } from "@next/third-parties/google";


import HeaderImage from "./assets/header.webp";
import ReadyImage from "./assets/time.webp";
import IndependentImage from "./assets/independent.webp";
import FooterImage from "../assets/footer.webp";
import fasnachtLogo from "./assets/logo_black.svg";
import BajourLayoutLarge from "../components/bajour-layout-large";

export default function BaselBriefing() {
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
      intro: "erscheint im Fasnachts-Rhythmus",
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
              description: "Wo wohnst du? Trage hier deine PLZ ein.",
              name: "PLZ",
              label: "Postleitzahl",
              type: "number",
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
                { id: '088f8f7a77', name: '🏙️Basel-Briefing', description: "Das Wichtigste aus Basel!" },
                { id: '088f8f7a77', name: '⚽FCB-Briefing', description: "Up to date vor jedem Spiel." },//sind noch die falschen Nummern. Wäre allenfalls gut, diese Nummern in einer Config zu speichern und wiederzuverwenden.
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
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=fasnachts-briefing-member&firstName=|*VORNAME*|&mail=|*EMAIL*|",
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
