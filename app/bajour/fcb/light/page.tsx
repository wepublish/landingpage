import { GoogleAnalytics } from "@next/third-parties/google";
import bajourIphone from "../assets/bajour-iphone.png"
import fcbLogo from "../assets/logo_black.svg";
import BajourLayoutMedium from "../../components/bajour-layout-medium";
import { resolveBajourConfig } from "../../config";

export default async function BaselBriefingLight() {
  const { listId, baselBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: fcbLogo,
    title: "Das Wichtigste vor jedem Spiel",
    subtitle: "Gut informiert ins Stadion (oder zumindest in der Kaffeepause mitreden): Hol dir das FCB-Briefing mit den wichtigsten News, Geschichten und Tipps rund um rotblau♥️💙.",
    image: bajourIphone,
    formConfig: {
      autoFocus: true,
      interests: [baselBriefingId],
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
      <BajourLayoutMedium {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
