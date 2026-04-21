import { Suspense } from "react";

import HeaderImage from "./assets/header.webp";
import ReadyImage from "./assets/time.webp";
import IndependentImage from "./assets/independent.webp";
import FooterImage from "./assets/footer.webp";
import bajourLogo from "./assets/logo_white.svg";
import BajourLayoutLarge from "./components/bajour-layout-large";
import { resolveBajourConfig } from "./config";
import { PLZ_TO_GEMEINDE } from "./gemeinden-mapping";

export default function BaselBriefingWrapper({ searchParams }: { searchParams: Promise<{ plz?: string }> }) {
  return (
    <Suspense fallback={null}>
      <BaselBriefing searchParams={searchParams} />
    </Suspense>
  )
}

async function BaselBriefing({
  searchParams,
}: {
  searchParams: Promise<{ plz?: string }>;
}) {
  const { plz } = await searchParams;
  const gemeinde = plz ? PLZ_TO_GEMEINDE[plz] : undefined;
  const { tenant, listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: bajourLogo,
    title: "Basel Briefing",
    wappen: gemeinde?.wappen,
    subtitle: gemeinde ? `Neu mit Lokalnachrichten aus ${gemeinde.name}` : "Das Wichtigste für den Start in den Tag",
    lead: `Du willst wissen, was in ${gemeinde ? `${gemeinde.name} und der Region Basel` : "Basel"} läuft, hast aber keine Lust, dich durch die Zeitungen und Online-Portale zu pflügen?`,
    wakeup: {
      intro: "Wir von Bajour nehmen<br>dir diese Arbeit ab. Wir arbeiten die Nacht durch, damit du morgens gut informiert in den Tag starten kannst.",
      leadup: "",
      time: "",
      context: ""
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
      header: gemeinde?.image ?? HeaderImage,
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
              name: "VORNAME",
              label: "Vorname",
              type: "text",
              required: true,
            }, {
              name: "NACHNAME",
              label: "Nachname",
              type: "text",
            },
          ],
        },
        {
          inputs: [
            {
              description: "Wir haben noch weitere Briefings zu Spezialthemen im Angebot. Interessiert?",
              type: "groups" as const,
              options: [
                { id: fcbBriefingId, name: '⚽FCB-Briefing', description: "Up to date vor jedem Spiel." },
                { id: fasnachtsBriefingId, name: '🎉Fasnachts-Briefing', description: "Alles rund um die Basler Fasnacht." },
              ]
            }
          ],
        },
        {
          skipIfFieldsFilled: ["PLZ"],

          inputs: [
            {
              description: "Für gewisse Gemeinden ergänzen wir das Briefing mit Lokalnachrichten. Trage hier deine Postleitzahl ein und lass dich überraschen!",
              name: "PLZ",
              label: "Postleitzahl",
              type: "number",
            },
          ],
        },
      ],
      tenant,
      listId,
      // input muss mit mailchimp Zielgruppenfelder übereinstimmen
      mailchimpFields: [
        { name: "UTM_SOURCE", urlParam: "utm_source" },
        { name: "UTM_MEDIUM", urlParam: "utm_medium" },
        { name: "UTM_CAMP", urlParam: "utm_campaign" },
        { name: "EMAIL", urlParam: "email" },
        { name: "VORNAME", urlParam: "vorname", defaultValue: "Leser*in" },
        { name: "NACHNAME", urlParam: "nachname" },
        { name: "PLZ", urlParam: "plz" },
        ...(gemeinde ? [{ name: "GEMEINDNWS", value: plz }] : []),
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas Kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=bajour-member&additionalMemberPlans=upsell&firstName=|*VORNAME*|&mail=|*EMAIL*|&lastName=|*NACHNAME*|&memberPlanBySlug=bajour-member&additionalMemberPlans=upsell",
          },
          {
            label: "Nein",
            background: "#bfbfbfff",
            url: "https://bajour.ch/willkommen-briefing",
          },
        ],
      },
    },
  };

  return (
    <>
      <BajourLayoutLarge {...briefingProps} />
    </>
  );
}
