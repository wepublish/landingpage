import { SuccessPageConfig } from "@/types/types";
import "./mailchimp-form.css";

interface MailchimpSuccessPageProps {
  successPage: SuccessPageConfig;
}

function MailchimpSuccessPage({ successPage }: MailchimpSuccessPageProps) {
  return (
    <div className="form-background">
      <div className="mailchimp-success-page">
        <p className="mailchimp-success-description">
          {successPage.description}
        </p>
        <div className="mailchimp-success-options">
          {successPage.options.map((option, idx) => (
            <a
              key={idx}
              href={option.url}
              className="mailchimp-success-option-button"
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
