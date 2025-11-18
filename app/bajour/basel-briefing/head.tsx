import { MetaPixelFallback } from "@/components/MetaPixelFallback";

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID_BAJOUR_LANDING_PAGE_1;

export default function Head() {
  return <MetaPixelFallback pixelId={META_PIXEL_ID} />;
}
