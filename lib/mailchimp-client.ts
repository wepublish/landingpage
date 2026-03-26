export interface ContactData {
  email: string;
  status: "subscribed" | "pending";
  mergeFields: Record<string, string>;
  interests: Record<string, boolean>;
}

interface MailchimpInfo {
  lists: List[];
}

interface List {
  id: string;
  name: string;
  mergeFields: MergeField[];
  groups: Group[];
}

interface MergeField {
  name: string;
  tag: string;
}

interface Group {
  id: string;
  name: string;
  options: GroupOption[];
}

interface GroupOption {
  id: string;
  name: string;
}

export class Mailchimp {
  private baseUrl: string;
  private authHeader: string;

  constructor(private apiKey: string) {
    const server = apiKey.split("-")[1];
    this.baseUrl = `https://${server}.api.mailchimp.com/3.0`;
    this.authHeader = `Basic ${btoa(`anystring:${apiKey}`)}`;
  }

  private async request(path: string, init?: RequestInit) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: this.authHeader,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(`Mailchimp API error: ${json.title} - ${json.detail}`);
    }
    return json;
  }

  async getInfoJson(): Promise<MailchimpInfo> {
    const listResponse = await this.request("/lists?count=100");
    const info: MailchimpInfo = { lists: [] };

    for (const list of listResponse.lists) {
      const listInfo: List = {
        id: list.id,
        name: list.name,
        mergeFields: [],
        groups: [],
      };

      const mergeFieldResponse = await this.request(
        `/lists/${list.id}/merge-fields?count=100`
      );
      for (const mf of mergeFieldResponse.merge_fields) {
        listInfo.mergeFields.push({ name: mf.name, tag: mf.tag });
      }

      const categoriesResponse = await this.request(
        `/lists/${list.id}/interest-categories`
      );
      for (const category of categoriesResponse.categories) {
        const group: Group = {
          id: category.id,
          name: category.title,
          options: [],
        };

        const interestsResponse = await this.request(
          `/lists/${list.id}/interest-categories/${category.id}/interests`
        );
        for (const interest of interestsResponse.interests) {
          group.options.push({ id: interest.id, name: interest.name });
        }

        listInfo.groups.push(group);
      }

      info.lists.push(listInfo);
    }

    return info;
  }

  async addContact(listId: string, data: ContactData): Promise<void> {
    const email = data.email.trim().toLowerCase();
    const encoder = new TextEncoder();
    const msgBuffer = encoder.encode(email);
    const hashBuffer = await crypto.subtle.digest("MD5", msgBuffer);
    const subscriberHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    await this.request(`/lists/${listId}/members/${subscriberHash}`, {
      method: "PUT",
      body: JSON.stringify({
        email_address: data.email.trim(),
        status: data.status,
        status_if_new: data.status,
        merge_fields: data.mergeFields,
        interests: data.interests,
      }),
    });
  }
}

export function getMailchimpApiKey(tenant: string): string {
  const key = process.env[`MAILCHIMP_API_KEY_${tenant}`];
  if (!key) {
    throw new Error(`Missing env var MAILCHIMP_API_KEY_${tenant}`);
  }
  return key;
}

export function createMailchimpClient(tenant: string): Mailchimp {
  return new Mailchimp(getMailchimpApiKey(tenant));
}
