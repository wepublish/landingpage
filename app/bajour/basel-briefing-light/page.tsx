import { GoogleAnalytics } from "@next/third-parties/google";
import BriefingLight from "@/app/bajour/components/briefing-light";
import bajourIphone from "./bajour-iphone.png"

export default function TestBriefingLight() {
  const briefingProps = {
    title: "Das Wichtigste aus Basel!",
    subtitle: "Hol dir bajour.ch in deinen Posteingang! Wähle die Newsletter, die dich interessieren.",
    image: bajourIphone,
    interests: ["47ed10ad9f", "22b72061f1"],
    steps: [
      {
        stepId: "step1",
        inputs: [
          {
            name: "email",
            label: "E-Mail",
            type: "email",
            required: true,
          },
        ],
      },
      {
        stepId: "step2",
        inputs: [
          {
            name: "lname",
            label: "Nachname",
            type: "text",
            required: true,
          },
          {
            name: "fname",
            label: "Vorname",
            type: "text",
            required: true,
          },
        ],
      },
      {
        stepId: "step3",
        inputs: [
          {
            name: "plz",
            label: "Postleitzahl",
            type: "number",
            required: true,
          },
        ],
      },
    ],
    listId: "851436c80e",
    // input muss mit mailchimp Zielgruppenfelder übereinstimmen
    mailChimpProps: [
      { param: "utm_source", input: "UTM_SOURCE" },
      { param: "utm_medium", input: "UTM_MEDIUM" },
      { param: "utm_campaign", input: "UTM_CAMP" },
      { param: "email", input: "EMAIL" },
      { param: "fname", input: "FNAME" },
      { param: "lname", input: "LNAME" },
      { param: "plz", input: "PLZ" },
    ],
    successUrl: "",
  };

  return (
    <>
      <BriefingLight {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
