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

  // creating an object from url params
  const defaultsByInput = formConfig.mailChimpProps.reduce<Record<string, string>>(
    (acc, data) => {
      const urlParameterValue = searchParams.get(data.param);
      if (urlParameterValue) acc[data.param] = urlParameterValue;
      return acc;
    },
    {}
  );

  const stepsWithDefaults = formConfig.steps.map((step) => {
    let changed = false;

    const inputs = step.inputs.map((input) => {
      const defaultValue = defaultsByInput[input.name];
      if (!defaultValue || input.defaultValue === defaultValue) return input;
      changed = true;
      return { ...input, defaultValue };
    });

    return changed ? { ...step, inputs } : step;
  });

  const [i, setI] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const last =
    stepsWithDefaults.length > 0 && i === stepsWithDefaults.length - 1;

  const currentStep = stepsWithDefaults[i];
  const isLastStep = i === stepsWithDefaults.length - 1;
  const hasSteps = stepsWithDefaults.length > 0;

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setError(null);

    if (!last) {
      setI((x) => Math.min(stepsWithDefaults.length - 1, x + 1));
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(formEvent.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());

    const dynamicMergeFields = formConfig.mailChimpProps.reduce<Record<string, any>>(
      (acc, data) => {
        if (dataObject[data.param]) {
          if (data.param.toUpperCase() === "EMAIL") return acc;
          acc[data.param.toUpperCase()] = dataObject[data.param];
        } else {
          const urlParam = searchParams.get(data.param);
          if (urlParam) acc[data.input] = urlParam;
        }
        return acc;
      },
      {}
    );

    const contactData: ContactData = {
      email_address: (dataObject.email as string) || "",
      status: "subscribed",
      interests: Object.fromEntries(
        formConfig.interests.map((i) => [i, true])
      ) as Record<string, boolean>,
      merge_fields: dynamicMergeFields,
    };

    const response = await addContact(formConfig.listId, contactData);
    setIsSubmitting(false);

    if (response.success && response.data?.status === "subscribed") {
      if (formConfig.successPage) {
        setIsSubmitted(true);
      } else {
        router.push(formConfig.successUrl);
      }
    } else {
      setError(response.error || "Ein unbekannter Fehler ist aufgetreten.");
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
              {currentStep.inputs.map((input) => (
                <div key={input.name} className="mailchimp-input-group">
                  {input.description && (
                    <p className="mailchimp-input-description">
                      {input.description}
                    </p>
                  )}
                  <label htmlFor={input.name} className="mailchimp-label">
                    {input.label ?? input.name}
                  </label>
                  <input
                    id={input.name}
                    type={input.type}
                    name={input.name}
                    className="mailchimp-input"
                    defaultValue={input.defaultValue}
                    required={input.required}
                  />
                </div>
              ))}
            </div>

            <div className="mailchimp-button-row">
              <button
                type="button"
                className="mailchimp-button back"
                disabled={i === 0 || isSubmitting}
                onClick={() => setI((x) => Math.max(0, x - 1))}
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
