import { Suspense } from "react";
import type { Metadata } from "next";

import bajourIphone from "../assets/bajour-iphone.png"
import bajourLogo from "../assets/logo_black.svg";
import BajourLayoutMedium from "../components/bajour-layout-medium";
import { resolveBajourConfig } from "../config";
import { PLZ_TO_GEMEINDE } from "../gemeinden-mapping";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ plz?: string }>;
}): Promise<Metadata> {
  const { plz } = await searchParams;
  const gemeinde = plz ? PLZ_TO_GEMEINDE[plz] : undefined;

  return {
    title: gemeinde
      ? `Basel Briefing – Lokalnachrichten aus ${gemeinde.name}`
      : "Basel Briefing – Das Wichtigste für den Start in den Tag",
    description: gemeinde
      ? `Abonniere das Basel Briefing mit Lokalnachrichten aus ${gemeinde.name} und der Region Basel.`
      : "Abonniere das Basel Briefing – jeden Morgen die wichtigsten Nachrichten aus der Region Basel.",
  };
}

export default function BaselBriefingLightWrapper({ searchParams }: { searchParams: Promise<{ plz?: string }> }) {
  return (
    <Suspense fallback={null}>
      <BaselBriefingLight searchParams={searchParams} />
    </Suspense>
  )
}

async function BaselBriefingLight({
  searchParams,
}: {
  searchParams: Promise<{ plz?: string }>;
}) {
  const { plz } = await searchParams;
  const gemeinde = plz ? PLZ_TO_GEMEINDE[plz] : undefined;
  const { tenant, listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: bajourLogo,
    title: `Die beliebtesten Newsletter von ${gemeinde?.name ?? "Basel"}!`,
    subtitle: "Bestens informiert mit Bajour. Wähle, was dich interessiert.",
    image: bajourIphone,
    formConfig: {
      autoFocus: true,
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

              type: "groups" as const,
              options: [
                { id: baselBriefingId, name: '🏙️Basel-Briefing', description: "Das Wichtigste aus Basel! Jeden Werktag in deinem Posteingang." },
                { id: fcbBriefingId, name: '⚽FCB--Briefing', description: "Gut informiert ins Stadion. Erscheint vor jedem Spiel." },
                { id: fasnachtsBriefingId, name: '🎉Fasnachts-Briefing', description: "Deine Fasnächtliche Grundversorgung." },
              ]
            }
          ],

        },

        {skipIfFieldsFilled: ["VORNAME"],
          inputs: [
            {
              name: "VORNAME",
              label: "Wie dürfen wir dich ansprechen (Vorname)?",
              required: true,
            },
          ],
        },
        {
          skipIfFieldsFilled: ["PLZ"],

          inputs: [
            {
              description: "Für gewisse Gemeinden ergänzen wir das Basel-Briefing mit Lokalnachrichten. Trage hier deine Postleitzahl ein und lass dich überraschen!",
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
        { name: "UTM_CAMPAI", urlParam: "utm_campaign" },
        { name: "EMAIL", urlParam: "email" },
        { name: "VORNAME", urlParam: "vorname", defaultValue: "Leser*in" },
        { name: "NACHNAME", urlParam: "nachname" },
        { name: "PLZ", urlParam: "plz" },
        ...(gemeinde ? [{ name: "GEMEINDNWS", value: plz }] : []),
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=bajour-member&additionalMemberPlans=upsell&firstName=|*VORNAME*|&mail=|*EMAIL*|&memberPlanBySlug=bajour-member&additionalMemberPlans=upsell",
            mergeField: { name: "WILLZAHLEN", value: "1" },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": gemeinde ? `Basel Briefing – Lokalnachrichten aus ${gemeinde.name}` : "Basel Briefing",
    "provider": {
      "@type": "Organization",
      "name": "Bajour",
    },
    "description": gemeinde
      ? `Ein täglicher News-Service für ${gemeinde.name} und die Region Basel.`
      : "Ein täglicher News-Service für die Region Basel.",
    "areaServed": gemeinde ? [gemeinde.name, "Basel"] : "Basel",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BajourLayoutMedium {...briefingProps} />
    </>
  );
}
