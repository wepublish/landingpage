import { createMailchimpClient } from "@/lib/mailchimp-client";
import { cacheLife } from "next/cache";

async function getMailchimpInfo(tenant: string) {
  "use cache";
  cacheLife("hours");
  console.log("Fetching Mailchimp Info from API");
  const mailchimp = createMailchimpClient(tenant);
  return mailchimp.getInfoJson();
}

export async function resolveListId(tenant: string, listName: string): Promise<string> {
  const info = await getMailchimpInfo(tenant);
  const list = info.lists.find((l) => l.name === listName);
  if (!list) {
    const available = info.lists.map((l) => l.name).join(", ");
    throw new Error(
      `Mailchimp list "${listName}" not found. Available lists: ${available}`
    );
  }
  return list.id;
}

export async function resolveInterestIds(
  tenant: string,
  listId: string,
  names: string[]
): Promise<string[]> {
  const info = await getMailchimpInfo(tenant);
  const list = info.lists.find((l) => l.id === listId);
  if (!list) throw new Error(`Mailchimp list with ID "${listId}" not found`);

  const nameToId = new Map<string, string>();
  for (const group of list.groups) {
    for (const option of group.options) {
      nameToId.set(option.name, option.id);
    }
  }

  return names.map((name) => {
    const id = nameToId.get(name);
    if (!id) {
      const available = [...nameToId.keys()].join(", ");
      throw new Error(
        `Interest group "${name}" not found in list "${listId}". Available groups: ${available}`
      );
    }
    return id;
  });
}
