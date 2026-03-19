import { resolveListId, resolveInterestIds } from "@/lib/resolve-interests";

const TENANT = "BAJOUR";

export async function resolveBajourConfig() {
  const listId = await resolveListId(TENANT, "Bajour");
  const [baselBriefingId, fcbBriefingId, fasnachtsBriefingId] =
    await resolveInterestIds(TENANT, listId, [
      "Basel Briefing (täglich)",
      "FCB-Briefing (vor jedem Spiel)",
      "Fasnachts-Briefing (im Fasnachts-Rhythmus)",
    ]);
  return { tenant: TENANT, listId, baselBriefingId, fcbBriefingId, fasnachtsBriefingId };
}
