import { GoogleAnalytics } from "@next/third-parties/google";
import BriefingLight from "@/app/bajour/components/briefing-light";
import bajourIphone from "./bajour-iphone.png"

export default function TestBriefingLight() {
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
            label: "Zur Startseite",
            background: "#bfbfbfff",
            url: "https://bajour.ch",
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
