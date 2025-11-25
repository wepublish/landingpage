export interface Input {
  description?: string;
  name: string;
  required: boolean;
  type: string;
  label?: string;
  defaultValue?: string;
}

export interface HideIf {
  condition: string;
  inputs: Input[];
}

export interface Step {
  stepId: string;
  inputs: Input[];
}

export interface HtmlContent {
  __html: string;
}

export interface FormConfig {
  listId: string;
  interests: string[];
  mailChimpProps: { param: string; input: string }[];
  steps: Step[];
  successUrl: string;
}

export interface ContactData {
  email_address: string;

  status: "subscribed" | "pending";
  merge_fields: Record<string, boolean>;
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
