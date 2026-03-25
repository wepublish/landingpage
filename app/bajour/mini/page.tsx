
import BajourLayoutSmall from "../components/bajour-layout-small";
import bajourIphone from "../assets/bajour-iphone.png";
import bajourLogo from "../assets/logo_black.svg";
import { resolveBajourConfig } from "../config";

export default async function BaselBriefingSuperlight() {
  const { listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId } = await resolveBajourConfig();

  const briefingProps = {
    logo: bajourLogo,
    title: "Das Wichtigste aus Basel",
    subtitle: "Damit du weisst, was in deiner Stadt passiert: Hol dir das Basel Briefing mit den wichtigsten News, Geschichten und Tipps. Kuratiert bis spät in die Nacht – gelesen in 5 Minuten. Montag bis Freitag um 6 Uhr in deinem Postfach.",
    image: bajourIphone,
    listItems: [
      "Basel-News des Tages",
      "unabhängig und kostenlos",
      "Eventtipps",
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
