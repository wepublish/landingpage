import LandingPage from "@/components/bajourLandingPages/landingPage";
import { MetaPixel } from "@/components/MetaPixel";
import { BriefingProperties } from "@/types/types";
import { GoogleAnalytics } from "@next/third-parties/google";

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID_BAJOUR_LANDING_PAGE_2;

export default function TestBriefing() {
  const briefingProps: BriefingProperties = {
    // das sind die Gruppen Id's neue Newsletter-Abonennten werden automatisch diesen Gruppen zugewiesen
    interests: ["6d529bb42b"],
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
      <LandingPage {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
      <MetaPixel pixelId={META_PIXEL_ID} />
    </>
  );
}
