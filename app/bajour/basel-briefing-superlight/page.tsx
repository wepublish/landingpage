import { GoogleAnalytics } from "@next/third-parties/google";
import BajourLayoutSuperlight from "../components/bajour-layout-superlight";
import bajourIphone from "./bajour-iphone.png"

export default function BaselBriefingSuperlight() {
  const briefingProps = {
    title: "Das Wichtigste aus Basel",
    subtitle: "Damit du weisst, was in deiner Stadt passiert: Hol dir das Basel Briefing mit den wichtigsten News, Geschichten und Tipps. Kuratiert bis spät in die Nacht – gelesen in 5 Minuten. Montag bis Freitag um 6 Uhr in deinem Postfach.",
    image: bajourIphone,
    formConfig: {
      interests: ["47ed10ad9f", "22b72061f1"],
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
        
        {skipIfFieldsFilled: ["FNAME"],
          inputs: [
            {
              name: "FNAME",
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
                { id: '47ed10ad9f', name: '⚽FCB-Briefing', description: "Up to date vor jedem Spiel." },//sind noch die falschen Nummern. Wäre allenfalls gut, diese Nummern in einer Config zu speichern und wiederzuverwenden.
                { id: '22b72061f1', name: '🎉Fasnachts-Briefing', description: "Alles rund um die Basler Fasnacht." },
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
      listId: "851436c80e",
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
            url: "https://bajour.ch/mitmachen?firstName=|*FNAME*|&mail=|*EMAIL*|&memberPlanBySlug=bajour-member&additionalMemberPlans=upsell",
          },
          {
            label: "Nein",
            background: "#bfbfbfff",
            url: "https://www.instagram.com/bajourbasel",
          },
        ],
      },
    },
  };

  return (
    <>
      <BajourLayoutSuperlight {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
