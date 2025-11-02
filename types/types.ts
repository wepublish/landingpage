export interface urlData {
  param: string;
  input: string;
}

export interface Input {
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

export interface FormConfig {
  listId: string;
  interests?: Record<string, boolean>;
  urlData: { param: string; input: string }[];
  steps: Step[];
  successUrl: string;
}

export interface ContactData {
  email_address: string;

  status: "subscribed" | "pending";
  merge_fields: {
    FNAME: string;
    LNAME: string;
    UTM_SOURCE?: string;
    UTM_MEDIUM?: string;
    UTM_CAMPAIGN?: string;
  };
  interests?: Record<string, boolean>;
}

export interface MailChimpGroup {
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
