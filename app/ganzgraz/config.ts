import { resolveListId } from "@/lib/resolve-interests";

const TENANT = "GANZGRAZ";

export function resolveConfig() {
  const listId = resolveListId(TENANT, "ganzgraz");
  return { tenant: TENANT, listId };
}