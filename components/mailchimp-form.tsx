"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addContact } from "@/services/mailchimp.service";
import { ContactData, FormConfig } from "@/types/types";
import MailchimpSuccessPage from "./mailchimp-success-page";
import MailchimpError from "./mailchimp-error";
import "./mailchimp-form.css";

interface MailchimpFormProps {
  formConfig: FormConfig;
}

function MailchimpForm({ formConfig }: MailchimpFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState<Record<string, string>>(formConfig.mailchimpFields.reduce<Record<string, string>>((acc, field) => {
    const urlParam = searchParams.get(field.urlParam);
    acc[field.name] = urlParam ? urlParam : "";
    return acc;
  }, {}));
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = formConfig.steps;

  const first = currentStep === 0;
  const last = steps.length > 0 && currentStep === steps.length - 1;

  const isLastStep = currentStep === steps.length - 1;
  const hasSteps = steps.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const goBack = () => {
    setCurrentStep((x) => Math.max(0, x - 1));
  };

  const goForward = () => {
    setCurrentStep((x) => Math.min(steps.length - 1, x + 1));
  };

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    setError(null);
    setIsSubmitting(true);

    const contactData: ContactData = {
      email_address: formData["EMAIL"],
      status: "subscribed",
      interests: Object.fromEntries(Object.entries(formConfig.interests).map(([_, v]) => [v, true])),
      merge_fields: Object.fromEntries(Object.entries(formData).filter(([k, _]) => k !== "EMAIL")),
    };

    const response = await addContact(formConfig.listId, contactData);

    setIsSubmitting(false);

    if (response.error || (response.data?.status !== "subscribed")) {
      setError(response.error || "Ein unbekannter Fehler ist aufgetreten.");
      return;
    }

    if(!last) {
      goForward();
      return;
    }

    if (formConfig.successPage) {
      setIsSubmitted(true);
    } else {
      router.push(formConfig.successUrl);
    }
  }

  if (isSubmitted && formConfig.successPage) {
    return <MailchimpSuccessPage successPage={formConfig.successPage} />;
  }

  return (
    <div className="form-background">
      <form className="mailchimp-form" onSubmit={handleSubmit}>
        {error && <MailchimpError message={error} />}

        {hasSteps && (
          <>
            <div className="mailchimp-step">
              {steps[currentStep].inputs.map((input) => (
                <div key={input.name} className="mailchimp-input-group">
                  {input.description && (
                    <p className="mailchimp-input-description">
                      {input.description}
                    </p>
                  )}
                  <label htmlFor={input.name} className="mailchimp-label">
                    {input.label}
                  </label>
                  <input
                    id={input.name}
                    type={input.type || "text"}
                    name={input.name}
                    className="mailchimp-input"
                    required={input.required ?? false}
                    onChange={handleChange}
                    value={formData[input.name]}
                  />
                </div>
              ))}
            </div>

            <div className="mailchimp-button-row">
              <button
                type="button"
                className="mailchimp-button back"
                disabled={first || isSubmitting}
                onClick={goBack}
              >
                Zurück
              </button>

              {!isLastStep ? (
                <button className="mailchimp-button next" type="submit" disabled={isSubmitting}>
                  Weiter
                </button>
              ) : (
                <button className="mailchimp-button submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : "Abonnieren"}
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default MailchimpForm;
