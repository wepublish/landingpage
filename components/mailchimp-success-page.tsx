import { SuccessPageConfig } from "@/types/types";

interface MailchimpSuccessPageProps {
  successPage: SuccessPageConfig;
}

function MailchimpSuccessPage({ successPage }: MailchimpSuccessPageProps) {
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
