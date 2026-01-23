import { GoogleAnalytics } from "@next/third-parties/google";
import bajourIphone from "../assets/bajour-iphone.png"
import BajourLayoutLight from "../components/bajour-layout-light";

export default function BaselBriefingLight() {
  const briefingProps = {
    title: "Das Wichtigste aus Basel!",
    subtitle: "Hol dir bajour.ch in deinen Posteingang! Wähle die Newsletter, die dich interessieren.",
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
            },
          ],
        },
        {
          skipIfFieldsFilled: ["FNAME", "LNAME"],
          inputs: [
            {
              name: "LNAME",
              label: "Nachname",
              required: true,
            },
            {
              name: "FNAME",
              label: "Vorname",
              required: true,
            },
          ],
        },
        {
          skipIfInterestsFilled: ["6d529bb42b"],
          inputs: [
            {
              description: "Bist du an weiteren News interessiert?",
              type: "groups" as const,
              options: [
                { id: '47ed10ad9f', name: 'Gruppe A', description: "Weitere Neuigkeiten zu deiner Stadt" },
                { id: '22b72061f1', name: 'Gruppe B', description: "Partyanlässe" },
                { id: '6d529bb42b', name: 'Gruppe C', description: "News zu Physik und Mathematik" }
              ]
            }
          ]
        },
        {
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
            url: "https://bajour.ch/mitmachen",
          },
          {
            label: "Auf Insta folgen",
            background: "#bfbfbfff",
            url: "https://www.instagram.com/bajourbasel",
          },
        ],
      },
    },
  };

  return (
    <>
      <BajourLayoutLight {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
