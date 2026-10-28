"use server";

import { ContactData } from "@/lib/mailchimp";
import { createMailchimpClient } from "@/lib/mailchimp-client";

export async function addMailchimpContact(tenant: string, listId: string, contactData: ContactData) {
  const mailchimp = createMailchimpClient(tenant);

  try {
    await mailchimp.addContact(listId, contactData);
    return { success: true };
  } catch (error: any) {
    // Cloudflare only keeps the stack frames of a logged Error, so log name, message and cause explicitly
    console.error(`Mailchimp error: ${error?.name}: ${error?.message}`, {
      cause: error?.cause instanceof Error ? `${error.cause.name}: ${error.cause.message}` : error?.cause,
      stack: error?.stack,
    });

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
