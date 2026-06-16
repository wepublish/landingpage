import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FCB-Briefing – Das Wichtigste vor jedem Spiel",
  description: "Abonniere das FCB-Briefing und erhalte an jedem Spieltag die wichtigsten Infos zum FC Basel per E-Mail.",
};

import bajourIphone from "../assets/bajour-iphone.png"
import fcbLogo from "../assets/logo_black.svg";
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
  const { tenant, listId, baselBriefingId, fasnachtsBriefingId, fcbBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: fcbLogo,
    title: "Das Wichtigste vor jedem Spiel",
    subtitle: "Gut informiert ins Stadion (oder zumindest in der Kaffeepause mitreden): Hol dir das FCB-Briefing mit den wichtigsten News, Geschichten und Tipps rund um rotblau♥️💙.",
    image: bajourIphone,
    formConfig: {
      autoFocus: true,
      interests: [fcbBriefingId],
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
                { id: fasnachtsBriefingId, name: '🎉Fasnachts-Briefing', description: "Alles rund um die Basler Fasnacht." },
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
        { name: "PLZ", urlParam: "plz" },
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?firstName=|*VORNAME*|&mail=|*EMAIL*|&memberPlanBySlug=fcb-briefing-member",
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
    "name": "FCB-Briefing",
    "provider": { "@type": "Organization", "name": "Bajour" },
    "description": "Ein News-Service rund um den FC Basel – vor jedem Spiel in deinem Postfach.",
    "areaServed": "Basel",
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
