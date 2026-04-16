
import GanzgrazLayoutSmall from "./components/ganzgraz-layout-small";
import bajourIphone from "../assets/iphone.png";
import bajourLogo from "../assets/logo.webp";
import { resolveConfig } from "./config";

export default async function GrazBriefingSuperlight() {
  const { tenant, listId } = await resolveConfig();

  const briefingProps = {
    logo: bajourLogo,
    title: "Der Graz-Newsletter",
    subtitle: "Das Wichtigste aus deiner Stadt: Hol dir den Graz-Newsletter mit den besten News, Geschichten und Tipps. Ausgewählt und eingeordnet, morgens um 6 Uhr in deinem Postfach.",
    image: bajourIphone,
    listItems: [
      "Graz-News des Tages",
      "persönlich und kostenlos",
      "Gesichter, Tipps und Überblick",
      "Relevanz ohne Algorithmus",
      "pünktlich um 6 Uhr",
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
      buttonColor: "#FF6600",
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
        }
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
            background: "#ff8900",
            url: "https://ganzgraz.at/mitmachen?firstName=|*FNAME*|&mail=|*EMAIL*|",
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
