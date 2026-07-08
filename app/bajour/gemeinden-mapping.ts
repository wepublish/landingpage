import { StaticImageData } from "next/image";

import AeschImage from "./assets/gemeinden/4147.jpg";
import AeschWappen from "./assets/gemeinden/4147.svg";
import ArlesheimImage from "./assets/gemeinden/4144.jpg";
import ArlesheimWappen from "./assets/gemeinden/4144.svg";
import MünchensteinImage from "./assets/gemeinden/4142.jpg";
import MünchensteinWappen from "./assets/gemeinden/4142.svg";
import PrattelnImage from "./assets/gemeinden/4133.jpg";
import PrattelnWappen from "./assets/gemeinden/4133.svg";
import RiehenImage from "./assets/gemeinden/4125.jpg";
import RiehenWappen from "./assets/gemeinden/4125.svg";

export interface GemeindeInfo {
  name: string;
  image?: StaticImageData;
  wappen?: string;
}

export const PLZ_TO_GEMEINDE: Record<string, GemeindeInfo> = {
  "4147": { name: "Aesch", image: AeschImage, wappen: AeschWappen },
  "4123": { name: "Allschwil" },
  "4144": { name: "Arlesheim", image: ArlesheimImage, wappen: ArlesheimWappen },
  "4102": { name: "Binningen" },
  "4103": { name: "Bottmingen" },
  "4142": { name: "Münchenstein", image: MünchensteinImage, wappen: MünchensteinWappen },
  "4132": { name: "Muttenz" },
  "4133": { name: "Pratteln", image: PrattelnImage, wappen: PrattelnWappen },
  "4153": { name: "Reinach" },
  "4125": { name: "Riehen", image: RiehenImage, wappen: RiehenWappen },
};

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

// tolerate raw ("Münchenstein"), encoded ("M%C3%BCnchenstein"), NFD and
// slugged ("muenchenstein") variants
const normalize = (value: string) =>
  safeDecode(value)
    .normalize("NFC")
    .toLowerCase()
    .trim()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue");

const NAME_TO_PLZ: Record<string, string> = Object.fromEntries(
  Object.entries(PLZ_TO_GEMEINDE).map(([plz, info]) => [normalize(info.name), plz])
);

/**
 * Resolves a gemeinde from the `plz` query param or, as a fallback, from the
 * comma-separated `tags` param the CMS banner appends to the iframe URL.
 * Also returns the matching PLZ so consumers (e.g. mailchimp fields) always
 * have one, even when the match came from a tag.
 */
export function resolveGemeinde({
  plz,
  tags,
}: {
  plz?: string;
  tags?: string;
}): { gemeinde?: GemeindeInfo; plz?: string } {
  if (plz && PLZ_TO_GEMEINDE[plz]) {
    return { gemeinde: PLZ_TO_GEMEINDE[plz], plz };
  }

  // decode first so a still-encoded value ("Foo%2CBar") splits correctly
  for (const tag of tags ? safeDecode(tags).split(",") : []) {
    const matchedPlz = NAME_TO_PLZ[normalize(tag)];
    if (matchedPlz) {
      return { gemeinde: PLZ_TO_GEMEINDE[matchedPlz], plz: matchedPlz };
    }
  }

  return {};
}
