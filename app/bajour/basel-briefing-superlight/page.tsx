import { GoogleAnalytics } from "@next/third-parties/google";
import BriefingSuperlight from "../components/briefing-superlight";
import bajourIphone from "./bajour-iphone.png"

export default function TestBriefingSuperlight() {
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
      successUrl: "https://bajour.ch/mitmachen?mail=|*EMAIL*|"
    },
  };

  return (
    <>
      <BriefingSuperlight {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
