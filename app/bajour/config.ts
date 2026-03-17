import { resolveListId, resolveInterestIds } from "@/lib/resolve-interests";

export async function resolveBajourConfig() {
  const listId = await resolveListId("Bajour");
  const [baselBriefingId, fcbBriefingId, fasnachtsBriefingId] =
    await resolveInterestIds(listId, [
      "Basel Briefing (täglich)",
      "FCB-Briefing (vor jedem Spiel)",
      "Fasnachts-Briefing (im Fasnachts-Rhythmus)",
    ]);
  return { listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId };
}
