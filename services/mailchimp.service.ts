"use server";
import mailchimp from "@/app/mailChimpClient";
import {
  ContactData,
  MailChimpGroup,
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

  const interest: MailChimpGroup[] = interests.interests.map((i) => ({
    id: i.id,
    name: i.name,
  }));

  return interest;
}

export async function addContact(listId: string, data: ContactData) {
  try {
    const response = await mailchimp.lists.addListMember(listId, data);
    return response;
  } catch (error: any) {
    console.error("Mailchimp API error", error.response.body);

    throw error; // rethrow so callers can handle it
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
