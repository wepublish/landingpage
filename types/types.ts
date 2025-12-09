interface MailchimpField {
  name: string;
  urlParam: string;
}

interface BaseInput {
  description?: string;
  label?: string;
}

interface InterestGroup {
  id: string;
  name: string;
  description?: string;
}

interface GroupsInput extends BaseInput {
  name?: never;
  type: "groups";
  options: InterestGroup[];
  required?: never;
}

interface RegularInput extends BaseInput {
  name: string;
  type?: string;
  options?: never;
  required?: boolean;
}

type Input = GroupsInput | RegularInput;

interface Step {
  inputs: Input[];
  skipIfFieldsFilled?: string[];
  skipIfInterestsFilled?: string[];
}

interface BaseFormConfig {
  listId: string;
  interests: string[];
  mailchimpFields: MailchimpField[];
  steps: Step[];
}

export interface SuccessPageConfig {
  description: string;
  options: RedirectConfig[];
}

interface RedirectConfig {
  label: string;
  background: string;
  url: string;
}

type SuccessOptions =
  | { successUrl: string; successPage?: never }
  | { successPage: SuccessPageConfig; successUrl?: never };

export type FormConfig = BaseFormConfig & SuccessOptions;

export interface ContactData {
  email_address: string;

  status: "subscribed" | "pending";
  merge_fields: Record<string, string>;
  interests?: Record<string, boolean>;
}

export interface MailchimpGroup {
  id: string;
  name: string;
}

export interface MailchimpMergeField {
  id: number;
  tag: string;
  name: string;
  type: string;
  required: boolean;
}
