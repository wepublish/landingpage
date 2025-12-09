import { GoogleAnalytics } from "@next/third-parties/google";
import Briefing from "../components/briefing";

import HeaderImage from "./header.jpg";
import ReadyImage from "./ready.jpg";
import IndependentImage from "./independent.jpg";
import FooterImage from "./footer.jpg";
import { MetaPixel } from "@/components/MetaPixel";

export default function OberwilBriefing() {
  const briefingProps = {
    title: "Oberwil-Briefing",
    subtitle: "Das Wichtigste für den Start in den Tag",
    lead: "Du willst wissen, was in Oberwil läuft, hast aber keine Lust, dich durch die Zeitungen und Online-Portale zu pflügen?",
    wakeup: {
      intro: "Wir von Bajour nehmen dir diese Arbeit ab.",
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
      interests: [],
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
          skipIfFieldsFilled: ["PLZ"],
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
        {
          inputs: [
            {
              description: "Möchtest du weitere Briefings abonnieren?",
              type: "groups" as const,
              options: [
                { id: '47ed10ad9f', name: 'Basel-Briefing', description: "Weitere Neuigkeiten zu deiner Stadt" },
                { id: '22b72061f1', name: 'Party-Briefing', description: "Partyanlässe" },
                { id: '6d529bb42b', name: 'Physik-Briefing', description: "News zu Physik und Mathematik" }
              ]
            }
          ]
        }
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
            url: "https://bajour.ch/mitmachen?mail=|*EMAIL*|&firstName=|*FNAME*|&lastName=|*LNAME*|",
          },
          {
            label: "Zur Startseite",
            background: "#bfbfbfff",
            url: "https://www.instagram.com/bajourbasel/?hl=en",
          },
        ],
      },
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
