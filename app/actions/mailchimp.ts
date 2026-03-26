"use server";

import { ContactData } from "@wepublish/wepublish-mailchimp";
import { createMailchimpClient } from "@/lib/mailchimp-client";

export async function addMailchimpContact(tenant: string, listId: string, contactData: ContactData) {
  const mailchimp = createMailchimpClient(tenant);

  try {
    await mailchimp.addContact(listId, contactData);
    return { success: true };
  } catch (error: any) {
    console.error("Mailchimp error:", error);
    console.error(JSON.stringify(error, null, 4));

    let message = "Ein unbekannter Fehler ist aufgetreten.";

    try {
      if (error?.response?.text) {
        const body = JSON.parse(error.response.text);
        if (body.detail) {
          message = body.detail;
        }
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }
    } catch {
      // keep default message
    }

    return { success: false, error: message };
  }
}
