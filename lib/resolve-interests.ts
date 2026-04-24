import config from "./mailchimp-config.json";
import type { MailchimpConfig } from "./mailchimp-config-types";

const mailchimpConfig = config as MailchimpConfig;

function getMailchimpInfo(tenant: string) {
  const info = mailchimpConfig[tenant];
  if (!info) {
    throw new Error(
      `No Mailchimp config found for tenant "${tenant}". Available tenants: ${Object.keys(mailchimpConfig).join(", ")}. Run "npm run resolve-config" to regenerate.`
    );
  }
  return info;
}

export function resolveListId(tenant: string, listName: string): string {
  const info = getMailchimpInfo(tenant);
  const list = info.lists.find((l) => l.name === listName);
  if (!list) {
    const available = info.lists.map((l) => l.name).join(", ");
    throw new Error(
      `Mailchimp list "${listName}" not found. Available lists: ${available}`
    );
  }
  return list.id;
}

export function resolveInterestIds(
  tenant: string,
  listId: string,
  names: string[]
): string[] {
  const info = getMailchimpInfo(tenant);
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