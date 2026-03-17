import { GoogleAnalytics } from "@next/third-parties/google";
import bajourIphone from "../assets/bajour-iphone.png";
import fasnachtLogo from "../assets/logo_black.svg";
import BajourLayoutSmall from "../../components/bajour-layout-small";

export default function BaselBriefingSuperlight() {
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
      interests: ["5269ccc161"],
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
                { id: '088f8f7a77', name: '🏙️Basel-Briefing', description: "Das Wichtigste aus Basel!" },
                { id: '088f8f7a77', name: '⚽FCB-Briefing', description: "Up to date vor jedem Spiel." },//sind noch die falschen Nummern. Wäre allenfalls gut, diese Nummern in einer Config zu speichern und wiederzuverwenden.
              ]
            }
          ],
        },
        {
          skipIfFieldsFilled: ["PLZ"],

          inputs: [
            {
              description: "Für gewisse Gemeinden ergänzen wir das Briefing mit Lokalnachrichten. Trage hier deine Postleitzahl ein und lass dich überraschen!",
              name: "PLZ",
              label: "Postleitzahl",
              type: "number",
              required: true,
            },
          ],
        },
      ],
      listId: "bed6b33c61",
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
            url: "https://bajour.ch/mitmachen??memberPlanBySlug=bajour-member&additionalMemberPlans=upsell&firstName=|*VORNAME*|&mail=|*EMAIL*|&memberPlanBySlug=bajour-member&additionalMemberPlans=upsell",
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
      <BajourLayoutSmall {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
