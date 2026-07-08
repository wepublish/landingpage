import { GemeindeInfo } from "./gemeinden-mapping";

/**
 * Title and description used both for the page metadata (SEO) and as the
 * heading shown above the form in the iframe embed.
 */
export function briefingMetadata(gemeinde?: GemeindeInfo) {
  return {
    title: gemeinde
      ? `Basel Briefing – Lokalnachrichten aus ${gemeinde.name}`
      : "Basel Briefing – Das Wichtigste für den Start in den Tag",
    description: gemeinde
      ? `Abonniere das Basel Briefing mit Lokalnachrichten aus ${gemeinde.name} und der Region Basel.`
      : "Abonniere das Basel Briefing – jeden Morgen die wichtigsten Nachrichten aus der Region Basel.",
  };
}
