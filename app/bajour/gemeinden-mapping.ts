import { StaticImageData } from "next/image";

import AeschImage from "./assets/gemeinden/4147.jpg";
import AeschWappen from "./assets/gemeinden/4147.svg";
import ArlesheimImage from "./assets/gemeinden/4144.jpg";
import ArlesheimWappen from "./assets/gemeinden/4144.svg";
import MünchensteinImage from "./assets/gemeinden/4142.jpg";
import MünchensteinWappen from "./assets/gemeinden/4142.svg";
import PrattelnImage from "./assets/gemeinden/4133.jpg";
import PrattelnWappen from "./assets/gemeinden/4133.svg";

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
  "4125": { name: "Riehen" },
};
