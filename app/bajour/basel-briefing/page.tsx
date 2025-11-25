import { GoogleAnalytics } from "@next/third-parties/google";
import Briefing from "../components/briefing";

import HeaderImage from "./bb-header.jpg";
import ReadyImage from "./bb-ready.jpg";
import IndependentImage from "./bb-independent.jpg";
import FooterImage from "./bb-footer.jpg";
import { MetaPixel } from "@/components/MetaPixel";

export default function TestBriefing() {
  const briefingProps = {
    title: "Basel Briefing",
    subtitle: "Das Wichtigste für den Start in den Tag",
    lead: "Du willst wissen, was in Basel läuft, hast aber keine Lust, dich durch die Zeitungen und Online-Portale zu pflügen?",
    wakeup: {
      __html:
        'Wir von Bajour nehmen<br />dir diese Arbeit ab.<br />Wir stehen für dich werktags<br />um <span class="wakeuptext--time">3:00</span> Uhr auf',
    },
    ready: {
      __html:
        '<span class="readytext--everyday">Jeden Morgen ab</span><br /><span class="readytext--time">06:00</span><br /><span class="readytext--ready">für dich bereit</span>',
    },
    delivery: {
      __html:
        'und schicken dir<br />um <span class="deliverytext--time">6 Uhr</span> die wichtigsten<br />regionalen Tagesnews<br />plus unseren Senf dazu<br />per Mail.',
    },
    subscribe: {
      __html: "jetzt anmelden und immer<br />bestens informiert sein!",
    },
    mainBackground: "#feeae3",
    leadColor: "black",
    headerBackgroundImage: HeaderImage,
    readyBackgroundImage: ReadyImage,
    independentBackgroundImage: IndependentImage,
    footerBackgroundImage: FooterImage,
    blobBackground:
      "linear-gradient(to right top, var(--gradient-pink-dark), var(--gradient-pink-bright))",
    deliveryBackground:
      "linear-gradient(to top right, #00304b, #2161a6, #ffbaba)",
    subscribetextBackground:
      "linear-gradient(to right, var(--gradient-orange-dark), var(--gradient-orange-bright))",
    formConfig: {
      interests: ["47ed10ad9f", "22b72061f1"],
      steps: [
        {
          stepId: "step1",
          inputs: [
            {
              name: "EMAIL",
              label: "E-Mail",
              type: "email",
              required: true,
            },
            {
              name: "LNAME",
              label: "Nachname",
              type: "text",
              required: true,
            },
            {
              name: "FNAME",
              label: "Vorname",
              type: "text",
              required: true,
            },
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
      successUrl: "https://bajour.ch/mitmachen",
    },
  };

  return (
    <>
      <Briefing {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
      <MetaPixel
        pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID_BAJOUR_BASEL_BRIEFING!}
      />
    </>
  );
}
