"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addContact } from "@/services/mailchimp.service";
import { ContactData, FormConfig } from "@/types/types";
import MailchimpSuccessPage from "./mailchimp-success-page";
import MailchimpError from "./mailchimp-error";

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

  const [interests, setInterests] = useState<string[]>([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = formConfig.steps;

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const isMiddleStep = !isFirstStep && !isLastStep;
  const hasSteps = steps.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    console.log(formData);
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInterests((prev) => {
      if (e.target.checked) {
        return [...prev, value];
      } else {
        return prev.filter(v => v !== value);
      }
    });

    console.log(interests);
  }

  const shouldSkipStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex];

    // showIfInterestsFilled: skip if NOT all interests are present
    if (step.showIfInterestsFilled) {
      return !step.showIfInterestsFilled.every(interest =>
        formConfig.interests.includes(interest) || interests.includes(interest)
      );
    }

    // skipIfFieldsFilled: skip if all fields are filled
    if (step.skipIfFieldsFilled) {
      return step.skipIfFieldsFilled.every(field => formData[field]);
    }

    // skipIfInterestsFilled: skip if all interests are present
    if (step.skipIfInterestsFilled) {
      return step.skipIfInterestsFilled.every(interest =>
        formConfig.interests.includes(interest) || interests.includes(interest)
      );
    }

    return false;
  };

  const goForward = () => {
    let nextStep = currentStep + 1;

    while (nextStep < steps.length && shouldSkipStep(nextStep)) {
      nextStep++;
    }

    setCurrentStep(Math.min(steps.length - 1, nextStep));
  };

  const goBack = () => {
    let prevStep = currentStep - 1;

    while (prevStep >= 0 && shouldSkipStep(prevStep)) {
      prevStep--;
    }

    setCurrentStep(Math.max(0, prevStep));
  };

  const replacePlaceholders = (url: string): string => {
    return url.replace(/\|\*(\w+)\*\|/g, (_, fieldName) => {
      const value = formData[fieldName.toUpperCase()];
      return value ? encodeURIComponent(value) : '';
    });
  };

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    setError(null);
    setIsSubmitting(true);

    const contactData: ContactData = {
      email_address: formData["EMAIL"],
      status: "subscribed",
      interests: Object.fromEntries(Object.entries(formConfig.interests.concat(interests)).map(([_, v]) => [v, true])),
      merge_fields: Object.fromEntries(Object.entries(formData).filter(([k, _]) => k !== "EMAIL")),
    };

    const response = await addContact(formConfig.listId, contactData);

    setIsSubmitting(false);

    if (response.error || (response.data?.status !== "subscribed")) {
      setError(response.error || "Ein unbekannter Fehler ist aufgetreten.");
      return;
    }

    if(!isLastStep) {
      goForward();
      return;
    }

    if (formConfig.successPage) {
      setIsSubmitted(true);
    } else {
      const processedUrl = replacePlaceholders(formConfig.successUrl);
      router.push(processedUrl);
    }
  }

  if (isSubmitted && formConfig.successPage) {
    const processedSuccessPage = {
      ...formConfig.successPage,
      options: formConfig.successPage.options.map(option => ({
        ...option,
        url: replacePlaceholders(option.url)
      }))
    };
    return <MailchimpSuccessPage successPage={processedSuccessPage} />;
  }

  return (
    <div className="bg-white/50 backdrop-blur-md p-6 rounded-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <MailchimpError message={error} />}

        {hasSteps && (
          <>
            {steps[currentStep].inputs.map((input) => (
              <div key={input.name} className="flex flex-col gap-1.5">
                {input.description && (
                  <p className="text-md text-gray-800 mb-1">
                    {input.description}
                  </p>
                )}
                <label htmlFor={input.name} className="text-sm font-medium text-gray-700">
                  {input.label}
                </label>
                {input.type === "groups" ? (
                  <div className="flex flex-col gap-2">
                    {input.options?.map((option) => (
                      <label key={option.id} className="inline-flex items-baseline gap-2">
                        <input
                          type="checkbox"
                          name={input.name}
                          value={option.id}
                          required={false}
                          onChange={handleInterestChange}
                          checked={interests.includes(option.id)}
                        />
                        <div className="flex flex-col">
                          <span className="text-gray-700">{option.name}</span>
                          {option.description && (
                            <p className="text-gray-600 text-sm">{option.description}</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    id={input.name}
                    type={input.type || "text"}
                    name={input.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                    required={input.required ?? false}
                    onChange={handleChange}
                    value={formData[input.name]}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 gap-3">
              {!isFirstStep && (
                <button type="button" className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:opacity-90 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" disabled={isSubmitting} onClick={goBack}>
                  Zurück
                </button>
              )}

              {isFirstStep && (
                <button className="w-full px-6 py-3 text-white font-semibold bg-green-600 hover:opacity-90 active:bg-green-800 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" type="submit" disabled={isSubmitting}>
                  Jetzt kostenlos abonnieren
                </button>
              )}

              {isMiddleStep && (
                <button className="ml-auto px-6 py-2.5 text-white font-medium bg-green-600 hover:opacity-90 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : "Weiter"}
                </button>
              )}

              {isLastStep && !isFirstStep && (
                <button className="ml-auto px-6 py-2.5 text-white font-medium bg-green-600 hover:opacity-90 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : "Abschliessen"}
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
