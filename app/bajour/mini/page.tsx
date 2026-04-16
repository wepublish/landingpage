
import BajourLayoutSmall from "../components/bajour-layout-small";
import iphone from "../assets/iphone.png";
import logo from "../assets/logo.webp";
import { resolveBajourConfig } from "../config";

export default async function BaselBriefingSuperlight({
  searchParams,
}: {
  searchParams: Promise<{ plz?: string }>;
}) {

  const { tenant, listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: logo,
    title: "Der Graz-Newsletter",
    subtitle: "Das Wichtigste aus deiner Stadt: Hol dir den Graz-Newsletter mit den besten News, Geschichten und Tipps. Ausgewählt und eingeordnet, morgens um 6 Uhr in deinem Postfach.",
    image: iphone,
    listItems: [
      "Graz-News des Tages",
      "persönlich und kostenlos",
      "Gesichter, Tipps und Überblick",
      "Relevanz ohne Algorithmus",
      "pünktlich um 6 Uhr",
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
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas Kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://bajour.ch/mitmachen?memberPlanBySlug=bajour-member&additionalMemberPlans=upsell&firstName=|*VORNAME*|&mail=|*EMAIL*|",
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
      <BajourLayoutSmall {...briefingProps} />
    </>
  );
}
