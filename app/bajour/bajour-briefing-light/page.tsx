import { GoogleAnalytics } from "@next/third-parties/google";
import BriefingLight from "@/app/bajour/components/briefing-light";
import bajourIphone from "./bajour-iphone.png"

export default function BajourBriefingLight() {
  const briefingProps = {
    title: "Das Wichtigste aus Basel!",
    subtitle: "Hol dir bajour.ch in deinen Posteingang! Wähle die Newsletter, die dich interessieren.",
    image: bajourIphone,
    formConfig: {
      interests: ["22b72061f1"],
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
              description: "An welchen Briefings bist du interessiert?",
              type: "groups" as const,
              options: [
                { id: '47ed10ad9f', name: 'Basel-Briefing', description: "Weitere Neuigkeiten zu deiner Stadt" },
                { id: '22b72061f1', name: 'Party-Briefing', description: "Partyanlässe" },
                { id: '6d529bb42b', name: 'Physik-Briefing', description: "News zu Physik und Mathematik" }
              ]
            }
          ],
        },
        {
          inputs: [
            {
              name: "FNAME",
              label: "Wie dürfen wir dich im Briefing nennen?",
              required: true,
            },
          ],
        },
        {
          showIfInterestsFilled: ["47ed10ad9f"],
          inputs: [
            {
              description: "Interesse an Gemeindenews? Trage hier deine PLZ ein.",
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
        description: "Danke fürs Abonnieren! Möchtest du unabhängingen Journalismus finanziell unterstützen?",
        options: [
          {
            label: "Ja!",
            background: "#008b0eff",
            url: "https://bajour.ch/mitmachen?firstName=|*FNAME*|&mail=|*EMAIL*|",
          },
          {
            label: "Auf Instagram folgen",
            background: "#bfbfbfff",
            url: "https://www.instagram.com/bajourbasel",
          },
        ],
      },
    },
  };

  return (
    <>
      <BriefingLight {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
