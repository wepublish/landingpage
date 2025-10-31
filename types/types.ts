interface urlData {
  param: string;
  input: string;
}

interface Input {
  name: string;
  required: boolean;
  type: string;
}

interface HideIf {
  condition: string;
  inputs: Input[];
}

interface Step {
  stepId: string;
  inputs: Input[];
}

interface FormConfig {
  listId: string;
  interests?: Record<string, boolean>;
  urlData: urlData[];
  steps: Step[];
  successUrl: string;
}

interface ContactData {
  email_address: string;
  status: "subscribed" | "pending";
  merge_fields?: {
    FNAME?: string;
    LNAME?: string;
    UTM_SOURCE?: string;
    UTM_MEDIUM?: string;
    UTM_CAMPAIGN?: string;
  };
  interests?: Record<string, boolean>;
}
interface MailChimpGroup {
  id: string;
  name: string;
}

interface MailchimpMergeField {
  id: number;
  tag: string;
  name: string;
  type: string;
  required: boolean;
}
