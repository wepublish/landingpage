"use client";

import { SuccessPageConfig } from "@/types/types";
import { addMailchimpContact } from "@/app/actions/mailchimp";

interface MailchimpSuccessPageProps {
  successPage: SuccessPageConfig;
  email: string;
  tenant: string;
  listId: string;
  status: "subscribed" | "pending";
}

function MailchimpSuccessPage({ successPage, email, tenant, listId, status }: MailchimpSuccessPageProps) {
  const handleOptionClick = async (e: React.MouseEvent<HTMLAnchorElement>, option: SuccessPageConfig["options"][number]) => {
    if (option.mergeField) {
      e.preventDefault();
      await addMailchimpContact(tenant, listId, {
        email,
        status,
        mergeFields: { [option.mergeField.name]: option.mergeField.value },
        interests: {},
      });
      window.location.assign(option.url);
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-md p-6 rounded-md">
      <div className="space-y-5">
        <p className="text-md text-gray-800">
          {successPage.description}
        </p>
        <div className="flex flex-col gap-3 pt-4">
          {successPage.options.map((option, idx) => (
            <a
              key={idx}
              href={option.url}
              onClick={(e) => handleOptionClick(e, option)}
              className="w-full px-6 py-3 text-white font-semibold text-center rounded-lg transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: option.background }}
            >
              {option.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MailchimpSuccessPage;
