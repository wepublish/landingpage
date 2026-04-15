import { resolveListId } from "@/lib/resolve-interests";

const TENANT = "GANZGRAZ";

export async function resolveConfig() {
  const listId = await resolveListId(TENANT, "ganzgraz");
  return { tenant: TENANT, listId };
}
