
import GanzgrazLayoutSmall from "../components/ganzgraz-layout-small";
import bajourIphone from "../assets/bajour-iphone.png";
import bajourLogo from "../assets/logo_black.svg";
import { resolveConfig } from "../config";

export default async function GrazBriefingSuperlight() {
  const { tenant, listId } = await resolveConfig();

  const briefingProps = {
    logo: bajourLogo,
    title: `Das Wichtigste aus Graz`,
    subtitle: "Damit du weisst, was in deiner Stadt passiert: Hol dir das Graz Briefing mit den wichtigsten News, Geschichten und Tipps. Kuratiert bis spät in die Nacht – gelesen in 5 Minuten. Montag bis Freitag um 6 Uhr in deinem Postfach.",
    image: bajourIphone,
    listItems: [
      "Graz-News des Tages",
      "unabhängig und kostenlos",
      "Eventtipps",
      "Pünktlich um 6 Uhr",
      "Für Graz-Liebhaber",
    ],
    subscriberCountBold: "14'907",
    subscriberCountText: "Graz-Liebhaber lesen schon mit.",
    testimonials: [
      {
        quote: "Das Graz Briefing ist kurz und prägnant. Sozusagen das Wichtigste in Kürze. Perfekt für die kurze Zugfahrt zur Arbeit!!",
        author: "Simone (Gundeli)",
      },
      {
        quote: "Ich freue mich jeden Morgen aufs Briefing und bin jedesmal gespannt, was es aus der Region zu berichten gibt.",
        author: "Dorian (Binningen)",
      },
      {
        quote: "Das Graz Briefing gibt mir die Möglichkeit, mitreden zu können und repräsentiert viele Perspektiven. Die Veranstaltungstipps und aktuellen Diskurse sind super, makes me feel part of Graz.",
        author: "Lara (St. Johann)",
      },
    ],
    formConfig: {
      autoFocus: true,
      interests: [],
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
        { name: "FNAME", urlParam: "vorname", defaultValue: "Leser*in" },
        { name: "LNAME", urlParam: "nachname" },
      ],
      successPage: {
        description: "Nun noch eine letzte Frage: Findest du, dass unabhängiger Lokal-Journalismus etwas Kosten sollte?",
        options: [
          {
            label: "Ja",
            background: "#FFD60A",
            url: "https://ganzgraz.at/mitmachen?memberPlanBySlug=graz-member&additionalMemberPlans=upsell&firstName=|*FNAME*|&mail=|*EMAIL*|",
          },
          {
            label: "Nein",
            background: "#bfbfbfff",
            url: "https://ganzgraz.at/willkommen-briefing",
          },
        ],
      },
    },
  };

  return (
    <>
      <GanzgrazLayoutSmall {...briefingProps} />
    </>
  );
}
