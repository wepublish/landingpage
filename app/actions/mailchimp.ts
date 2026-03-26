"use server";

import { ContactData } from "@wepublish/wepublish-mailchimp";
import { createMailchimpClient } from "@/lib/mailchimp-client";

export async function addMailchimpContact(tenant: string, listId: string, contactData: ContactData) {
  const mailchimp = createMailchimpClient(tenant);

  try {
    await mailchimp.addContact(listId, contactData);
    return { success: true };
  } catch (error) {
    console.error("Mailchimp error:", error);
    console.error(JSON.stringify(error, null, 4));
    return { success: false, error: "Ein unbekannter Fehler ist aufgetreten." };
  }
}
