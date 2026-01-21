"use server";

import { ContactData, Mailchimp } from "@wepublish/wepublish-mailchimp";

export async function addMailchimpContact(listId: string, contactData: ContactData) {
  const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY!);

  try {
    await mailchimp.addContact(listId, contactData);
    return { success: true };
  } catch (error) {
    console.error("Mailchimp error:", error);
    return { success: false, error: "Ein unbekannter Fehler ist aufgetreten." };
  }
}
