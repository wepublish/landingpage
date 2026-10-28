// Temporary copy of the parts of @wepublish/wepublish-mailchimp (../mailchimp/index.ts) used here,
// including the request() error handling that isn't published to npm yet.
// Switch back to the package once a version with that change is released.
import { createHash } from "crypto";

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

export interface ContactData {
  email: string;
  status: "subscribed" | "pending";
  mergeFields: Record<string, string>;
  interests: Record<string, boolean>;
}

interface MailchimpErrorResponse {
  status: number;
  title: string;
  detail: string;
}

export class Mailchimp {
    private baseUrl: string;
    private authHeader: string;

    constructor(private apiKey: string) {
        const server = apiKey.split("-")[1];
        this.baseUrl = `https://${server}.api.mailchimp.com/3.0`;
        this.authHeader = `Basic ${btoa(`anystring:${apiKey}`)}`;
    }

    async getInfoJson(): Promise<MailchimpInfo> {
        return this.getInfo();
    }

    async addContact(listId: string, data: ContactData): Promise<void> {
        data.email = data.email.trim();

        const subscriberHash = createHash("md5")
            .update(data.email.toLowerCase())
            .digest("hex");

        const payload = {
            email_address: data.email,
            status: data.status,
            status_if_new: data.status,
            merge_fields: data.mergeFields,
            interests: data.interests,
        };

        const response = await this.request<Record<string, unknown>>(
            `PUT`,
            `/lists/${listId}/members/${subscriberHash}`,
            payload
        );

        if(this.isErrorResponse(response)) {
            throw new Error(`Error adding contact '${data.email}': ${response.title} - ${response.detail}`);
        }
    }

    private async getInfo(): Promise<MailchimpInfo> {
        const info: MailchimpInfo = { lists: [] };

        const listResponse = await this.request<{ lists: { id: string; name: string }[] }>(
            `GET`,
            `/lists?count=100`
        );

        if(this.isErrorResponse(listResponse)) {
            throw new Error(`Error fetching lists: ${listResponse.title} - ${listResponse.detail}`);
        }

        for(const list of listResponse.lists) {
            const listInfo: List = {
                id: list.id,
                name: list.name,
                mergeFields: [],
                groups: []
            };

            const mergeFieldResponse = await this.request<{ merge_fields: { name: string; tag: string }[] }>(
                `GET`,
                `/lists/${list.id}/merge-fields?count=100`
            );

            if(this.isErrorResponse(mergeFieldResponse)) {
                throw new Error(`Error fetching merge fields for list '${list.id}': ${mergeFieldResponse.title} - ${mergeFieldResponse.detail}`);
            }

            for(const mergeField of mergeFieldResponse.merge_fields) {
                listInfo.mergeFields.push({
                    name: mergeField.name,
                    tag: mergeField.tag
                });
            }

            const interestCategoriesResponse = await this.request<{ categories: { id: string; title: string }[] }>(
                `GET`,
                `/lists/${list.id}/interest-categories`
            );

            if(this.isErrorResponse(interestCategoriesResponse)) {
                throw new Error(`Error fetching interest categories for list '${list.id}': ${interestCategoriesResponse.title} - ${interestCategoriesResponse.detail}`);
            }

            for(const category of interestCategoriesResponse.categories) {
                const group: Group = {
                    id: category.id,
                    name: category.title,
                    options: []
                };

                const interestsResponse = await this.request<{ interests: { id: string; name: string }[] }>(
                    `GET`,
                    `/lists/${list.id}/interest-categories/${category.id}/interests`
                );

                if(this.isErrorResponse(interestsResponse)) {
                    throw new Error(`Error fetching interests for category '${category.id}' in list '${list.id}': ${interestsResponse.title} - ${interestsResponse.detail}`);
                }

                for(const interest of interestsResponse.interests) {
                    group.options.push({
                        id: interest.id,
                        name: interest.name
                    });
                }

                listInfo.groups.push(group);
            }

            info.lists.push(listInfo);
        }

        return info;
    }

    private async request<T>(method: string, path: string, body?: unknown): Promise<T | MailchimpErrorResponse> {
        const url = `${this.baseUrl}${path}`;
        let response: Response;

        try {
            response = await fetch(url, {
                method,
                headers: {
                    'Authorization': this.authHeader,
                    'Content-Type': 'application/json',
                    // Cloudflare Workers send no User-Agent by default, which Mailchimp's CDN (Akamai) may block
                    'User-Agent': 'wepublish-mailchimp',
                },
                ...(body ? { body: JSON.stringify(body) } : {}),
            });
        } catch (error) {
            const reason = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
            throw new Error(`Request ${method} ${url} failed: ${reason}`, { cause: error });
        }

        const text = await response.text();

        try {
            return JSON.parse(text) as T | MailchimpErrorResponse;
        } catch {
            throw new Error(`Request ${method} ${url} returned non-JSON response (HTTP ${response.status}): ${text.slice(0, 500)}`);
        }
    }

    private isErrorResponse(response: unknown): response is MailchimpErrorResponse {
        return typeof response === 'object' && response !== null && 'status' in response && 'detail' in response;
    }
}
