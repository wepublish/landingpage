import EmbedOr from "@/components/embed-or";
import { Suspense } from "react";
import type { Metadata } from "next";

import BajourLayoutSmall from "../components/bajour-layout-small";
import bajourIphone from "../assets/bajour-iphone.png";
import bajourLogo from "../assets/logo_black.svg";
import { resolveBajourConfig } from "../config";
import { resolveGemeinde } from "../gemeinden-mapping";
import { briefingMetadata } from "../briefing-metadata";
import { robotoCondensed } from "../fonts";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ plz?: string; tags?: string }>;
}): Promise<Metadata> {
  const { gemeinde } = resolveGemeinde(await searchParams);

  return briefingMetadata(gemeinde);
}

export default function BaselBriefingSuperlightWrapper({ searchParams }: { searchParams: Promise<{ plz?: string; tags?: string }> }) {
  return (
    <Suspense fallback={null}>
      <BaselBriefingSuperlight searchParams={searchParams} />
    </Suspense>
  )
}

async function BaselBriefingSuperlight({
  searchParams,
}: {
  searchParams: Promise<{ plz?: string; tags?: string }>;
}) {
  const { gemeinde, plz } = resolveGemeinde(await searchParams);
  const metadata = briefingMetadata(gemeinde);
  const { tenant, listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: bajourLogo,
    title: `Das Wichtigste aus ${gemeinde?.name ?? "Basel"}`,
    subtitle: gemeinde ? `Damit du weisst, was in  ${gemeinde.name} passiert: Hol dir das Basel Briefing mit den wichtigsten News, Geschichten und Tipps aus der Region. Kuratiert bis spät in die Nacht – gelesen in 5 Minuten. Montag bis Freitag um 6 Uhr in deinem Postfach.` : "Damit du weisst, was in deiner Stadt passiert: Hol dir das Basel Briefing mit den wichtigsten News, Geschichten und Tipps. Kuratiert bis spät in die Nacht – gelesen in 5 Minuten. Montag bis Freitag um 6 Uhr in deinem Postfach.",
    image: bajourIphone,
    listItems: [
      "Basel-News des Tages",
      gemeinde ? `Lokalnachrichten aus ${gemeinde.name}` : "Eventtipps",
      "unabhängig und kostenlos",
      "Pünktlich um 6 Uhr",
      "Für Basel-Liebhaber",
    ],
    subscriberCountBold: "14'907",
    subscriberCountText: "Basler*innen lesen schon mit.",
    testimonials: [
      {
        quote: "Das Basel Briefing ist kurz und prägnant. Sozusagen das Wichtigste in Kürze. Perfekt für die kurze Zugfahrt zur Arbeit!!",
        author: "Simone (Gundeli)",
      },
      {
        quote: "Ich freue mich jeden Morgen aufs Briefing und bin jedesmal gespannt, was es aus der Region zu berichten gibt.",
        author: "Dorian (Binningen)",
      },
      {
        quote: "Das Basel Briefing gibt mir die Möglichkeit, mitreden zu können und repräsentiert viele Perspektiven. Die Veranstaltungstipps und aktuellen Diskurse sind super, makes me feel part of Basel.",
        author: "Lara (St. Johann)",
      },
    ],
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
          skipIfFieldsFilled: ["GEMEINDNWS"],

          inputs: [
            {
              description: "Für gewisse Gemeinden ergänzen wir das Briefing mit Lokalnachrichten. Trage hier deine Postleitzahl ein und lass dich überraschen!",
              name: "GEMEINDNWS",
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
        { name: "GEMEINDNWS", urlParam: "plz" },
        ...(gemeinde ? [{ name: "GEMEINDNWS", value: plz }] : []),
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=bajour-member&additionalMemberPlans=upsell&firstName=|*VORNAME*|&mail=|*EMAIL*|",
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
      <EmbedOr
        formConfig={briefingProps.formConfig}
        title={metadata.title}
        description={metadata.description}
        className={robotoCondensed.className}
      >
        <BajourLayoutSmall {...briefingProps} />
      </EmbedOr>
    </>
  );
}
