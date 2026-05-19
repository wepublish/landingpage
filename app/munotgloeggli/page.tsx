import MunotgloeggliLayoutSmall from "./components/munotgloeggli-layout-small";
import iphone from "./assets/iphone.png";
import logo from "./assets/logo.png";
import { resolveConfig } from "./config";

import { Suspense } from "react";

export default function MunotgloeggliSuperlightWrapper() {
  return (
    <Suspense fallback={null}>
      <MunotgloeggliSuperlight />
    </Suspense>
  );
}

async function MunotgloeggliSuperlight() {
  const { tenant, listId } = await resolveConfig();

  const briefingProps = {
    logo: logo,
    title: 'Munotglöggli – der Newsletter für Schaffhausen',
    subtitle: "Das Montags-Update für Schaffhausen",
    text: "Hol dir das Munotglöggli mit den wichtigsten News, den spannendsten Geschichten und allerlei Wissenswertem.<br>Ein Angebot der Schaffhauser AZ: kuratiert, ausgewählt und eingeordnet, jeden Montag zu Feierabend in deinem Postfach.<br>Gratis! Am 1. Juni gehts los!",
    image: iphone,
    listItems: [
      "News aus der Region Schaffhausen",
      "Persönlich und gratis",
      "Hintergründe und Geschichten",
      "Jeden Montag zu Feierabend",
    ],
    subscriberCountBold: "14'907",
    subscriberCountText: "Schaffhauser lesen schon mit.",
    testimonials: [
      {
        quote: "Das Wichtigste aus Schaffhausen – kompakt und informativ. Perfekt für den Feierabend.",
        author: "Anna (Schaffhausen)",
      },
      {
        quote: "Ich freue mich jeden Montag aufs Munotglöggli. Genau die richtige Portion News.",
        author: "Thomas (Neuhausen)",
      },
      {
        quote: "Endlich ein Newsletter, der die Region im Blick hat. Kuratiert und persönlich – grossartig!",
        author: "Laura (Beringen)",
      },
    ],
    formConfig: {
      autoFocus: true,
      doubleOptIn: true,
      interests: [],
      buttonColor: "#DC0D15",
      buttonFontColor: "#FFFFFF",
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
        {skipIfFieldsFilled: ["FNAME"],
          inputs: [
            {
              name: "FNAME",
              label: "Wie dürfen wir dich ansprechen (Vorname)?",
              required: true,
            }
          ],
        }
      ],
      tenant,
      listId,
      mailchimpFields: [
        { name: "EMAIL", urlParam: "email" },
        { name: "FNAME", urlParam: "vorname", defaultValue: "Leser*in" },
        { name: "LNAME", urlParam: "nachname" },
      ],
      successPage: {
        description: "Bock auf News aus Schaffhausen?",
        options: [
          {
            label: "Ja!",
            background: "#ff8900",
            url: "https://munotgloeggli.ch/success",
          },
          {
            label: "Ganz viel!",
            background: "#bfbfbfff",
            url: "https://munotgloeggli.ch/success",
          },
        ],
      },
    },
  };

  return (
    <>
      <MunotgloeggliLayoutSmall {...briefingProps} />
    </>
  );
}
