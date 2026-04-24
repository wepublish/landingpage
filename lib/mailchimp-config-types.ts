export interface MailchimpConfig {
  [tenant: string]: MailchimpTenantInfo;
}

export interface MailchimpTenantInfo {
  lists: MailchimpList[];
}

export interface MailchimpList {
  id: string;
  name: string;
  mergeFields: MailchimpMergeField[];
  groups: MailchimpGroup[];
}

export interface MailchimpMergeField {
  name: string;
  tag: string;
}

export interface MailchimpGroup {
  id: string;
  name: string;
  options: MailchimpGroupOption[];
}

export interface MailchimpGroupOption {
  id: string;
  name: string;
}