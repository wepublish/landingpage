interface MailchimpField {
  name: string;
  urlParam: string;
  defaultValue?: string;
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

interface BaseStep {
  inputs: Input[];
}

interface StepWithSkipIfFieldsFilled extends BaseStep {
  skipIfFieldsFilled: string[];
  skipIfInterestsFilled?: never;
  showIfInterestsFilled?: never;
}

interface StepWithSkipIfInterestsFilled extends BaseStep {
  skipIfFieldsFilled?: never;
  skipIfInterestsFilled: string[];
  showIfInterestsFilled?: never;
}

interface StepWithShowIfInterestsFilled extends BaseStep {
  skipIfFieldsFilled?: never;
  skipIfInterestsFilled?: never;
  showIfInterestsFilled: string[];
}

interface StepWithNoConditions extends BaseStep {
  skipIfFieldsFilled?: never;
  skipIfInterestsFilled?: never;
  showIfInterestsFilled?: never;
}

type Step =
  | StepWithSkipIfFieldsFilled
  | StepWithSkipIfInterestsFilled
  | StepWithShowIfInterestsFilled
  | StepWithNoConditions;

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
