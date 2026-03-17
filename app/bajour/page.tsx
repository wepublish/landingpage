import { GoogleAnalytics } from "@next/third-parties/google";


import HeaderImage from "./assets/bb-header.jpg";
import ReadyImage from "./assets/bb-ready.jpg";
import IndependentImage from "./assets/bb-independent.jpg";
import FooterImage from "./assets/bb-footer.jpg";
import BajourLayoutLarge from "./components/bajour-layout-large";
import { resolveBajourConfig } from "./config";

export default async function BaselBriefing() {
  const { listId, baselBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    title: "Basel Briefing",
    subtitle: "Das Wichtigste für den Start in den Tag",
    lead: "Du willst wissen, was in Basel läuft, hast aber keine Lust, dich durch die Zeitungen und Online-Portale zu pflügen?",
    wakeup: {
      intro: "Wir von Bajour nehmen<br>dir diese Arbeit ab.",
      leadup: "Wir stehen für dich werktags um",
      time: "3:00",
      context: "Uhr auf"
    },
    ready: {
      intro: "Jeden Morgen ab",
      time: "06:00",
      outro: "für dich bereit"
    },
    delivery: {
      intro: "und schicken dir um",
      time: "6 Uhr",
      text: "die wichtigsten regionalen Tagesnews plus unseren Senf dazu per Mail."
    },
    subscribeText: "jetzt anmelden und immer<br />bestens informiert sein!",
    mainBackgroundColor: "#feeae3",
    leadColor: "black",
    images: {
      header: HeaderImage,
      ready: ReadyImage,
      independent: IndependentImage,
      footer: FooterImage,
    },
    formConfig: {
      autoFocus: false,
      interests: [baselBriefingId],
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
            }
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
      listId,
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
      <BajourLayoutLarge {...briefingProps} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
    </>
  );
}
