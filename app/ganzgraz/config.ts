import { resolveListId } from "@/lib/resolve-interests";

const TENANT = "GANZGRAZ";

export async function resolveConfig() {
  const listId = await resolveListId(TENANT, "Bajour"); // TODO: auf "ganzgraz" wechseln sobald Liste in Mailchimp angelegt
  return { tenant: TENANT, listId };
}
