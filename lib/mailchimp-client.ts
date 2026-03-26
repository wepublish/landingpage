import { Mailchimp } from "@wepublish/wepublish-mailchimp";

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
