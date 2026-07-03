import EmbedOr from "@/components/embed-or";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fasnachts-Briefing – Deine fasnächtliche Grundversorgung",
  description: "Abonniere das Fasnachts-Briefing und bleib rund ums Jahr übers fasnächtliche Geschehen informiert – kostenlos per E-Mail.",
};

import bajourIphone from "../assets/bajour-iphone.png"
import fasnachtLogo from "../assets/logo_black.svg";
import BajourLayoutMedium from "../../components/bajour-layout-medium";
import { resolveBajourConfig } from "../../config";

import { Suspense } from "react";

export default function BaselBriefingLightWrapper() {
  return (
    <Suspense fallback={null}>
      <BaselBriefingLight />
    </Suspense>
  );
}

async function BaselBriefingLight() {
  const { tenant, listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: fasnachtLogo,
    title: "Deine fasnächtliche Grundversorgung",
    subtitle: "Du willst rund ums Jahr übers fasnächtliche Geschehen informiert sein, ohne alle Zeitungen und Online-Portale zu lesen?",
    image: bajourIphone,
    formConfig: {
      autoFocus: true,
      interests: [fasnachtsBriefingId],
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
                { id: baselBriefingId, name: '🏙️Basel-Briefing', description: "Das Wichtigste aus Basel!" },
                { id: fcbBriefingId, name: '⚽FCB-Briefing', description: "Alles rund um den FCB." },
              ]
            }
          ],
        },
      ],
      tenant,
      listId,
      //
      mailchimpFields: [
        { name: "UTM_SOURCE", urlParam: "utm_source" },
        { name: "UTM_MEDIUM", urlParam: "utm_medium" },
        { name: "UTM_CAMPAI", urlParam: "utm_campaign" },
        { name: "EMAIL", urlParam: "email" },
        { name: "VORNAME", urlParam: "vorname", defaultValue: "Leser*in" },
        { name: "NACHNAME", urlParam: "nachname" },
        { name: "GEMEINDNWS", urlParam: "plz" },
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=fasnachts-briefing-member&firstName=|*VORNAME*|&mail=|*EMAIL*|",
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
    "name": "Fasnachts-Briefing",
    "provider": { "@type": "Organization", "name": "Bajour" },
    "description": "Ein News-Service rund um die Basler Fasnacht – deine fasnächtliche Grundversorgung.",
    "areaServed": "Basel",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EmbedOr formConfig={briefingProps.formConfig}>
        <BajourLayoutMedium {...briefingProps} />
      </EmbedOr>
    </>
  );
}
