import { Mailchimp } from "@wepublish/wepublish-mailchimp";
import { cache } from "react";

const getMailchimpInfo = cache(async () => {
  const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY!);
  return mailchimp.getInfoJson();
});

export async function resolveListId(listName: string): Promise<string> {
  const info = await getMailchimpInfo();
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
  listId: string,
  names: string[]
): Promise<string[]> {
  const info = await getMailchimpInfo();
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
