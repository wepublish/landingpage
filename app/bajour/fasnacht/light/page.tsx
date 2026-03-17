import { GoogleAnalytics } from "@next/third-parties/google";
import bajourIphone from "../assets/bajour-iphone.png"
import fasnachtLogo from "../assets/logo_black.svg";
import BajourLayoutMedium from "../../components/bajour-layout-medium";
import { resolveBajourConfig } from "../../config";

export default async function BaselBriefingLight() {
  const { listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: fasnachtLogo,
    title: "Deine fasnächtliche Grundversorgung",
    subtitle: "Du willst rund ums Jahr übers fasnächtliche Geschehen informiert sein, ohne alle Zeitungen und Online-Portale zu lesen?",
    image: bajourIphone,
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
                { id: fcbBriefingId, name: '⚽FCB-Briefing', description: "Alles rund um den FCB." },
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
      listId,
      //
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
      <BajourLayoutMedium {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
