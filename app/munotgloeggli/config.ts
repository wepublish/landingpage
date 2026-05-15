import { resolveListId } from "@/lib/resolve-interests";

const TENANT = "MUNOTGLOEGGLI";

export function resolveConfig() {
  const listId = resolveListId(TENANT, "Schaffhauser AZ");
  return { tenant: TENANT, listId };
}
