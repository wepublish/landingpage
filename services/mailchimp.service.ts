"use server";
import { createHash } from "crypto";
import mailchimp from "@/app/mailchimp-client";
import {
  ContactData,
  MailchimpGroup,
  MailchimpMergeField,
} from "@/types/types";

async function getInterestCategories(listId: string) {
  const response = await mailchimp.lists.getListInterestCategories(listId);
  return response;
}

async function getCategoryInterests(listId: string, categoryId: string) {
  const response = await mailchimp.lists.listInterestCategoryInterests(
    listId,
    categoryId
  );
  return response;
}

export async function getGroupIds(listId: string) {
  const interestCategories = await getInterestCategories(listId);

  if (!("categories" in interestCategories)) {
    console.error("Mailchimp error response:", interestCategories);
    throw new Error("Fehler beim Abrufen der Interest Categories");
  }

  const categoryId = interestCategories.categories[0].id;

  const interests = await getCategoryInterests(listId, categoryId);

  if (!("interests" in interests) || !Array.isArray(interests.interests)) {
    console.error("Mailchimp error response:", interests);
    throw new Error("Fehler beim Abrufen der Interests");
  }

  const interest: MailchimpGroup[] = interests.interests.map((i) => ({
    id: i.id,
    name: i.name,
  }));

  return interest;
}

export async function addContact(listId: string, data: ContactData) {
  const trimmedEmail = data.email_address.trim();

  const subscriberHash = createHash("md5")
    .update(trimmedEmail.toLowerCase())
    .digest("hex");

  const payload = {
    email_address: trimmedEmail,
    status: data.status,
    status_if_new: data.status,
    merge_fields: data.merge_fields,
    interests: data.interests,
  };

  data.email_address = trimmedEmail;

  try {
    const response = await mailchimp.lists.setListMember(
      listId,
      subscriberHash,
      payload
    );
    return { success: true, data: response };
  } catch (error: any) {
    console.error("Mailchimp API error", error?.response?.body ?? error);

    const errorBody = error?.response?.body;
    const errorMessage =
      errorBody?.detail || errorBody?.title || "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.";

    return { success: false, error: errorMessage };
  }
}

export async function getMergeFields(listId: string) {
  const response = await mailchimp.lists.getListMergeFields(listId);

  if (
    !response ||
    typeof response !== "object" ||
    !("merge_fields" in response) ||
    !Array.isArray((response as any).merge_fields)
  ) {
    console.error("Mailchimp merge fields response:", response);
    throw new Error("Fehler beim Abrufen der Merge Felder");
  }

  const mergeFields: MailchimpMergeField[] = response.merge_fields.map(
    (field: any) => ({
      id: field.merge_id,
      tag: field.tag,
      name: field.name,
      type: field.type,
      required: Boolean(field.required),
    })
  );

  return mergeFields;
}
