"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addContact } from "@/services/mailchimp.service";
import { ContactData, FormConfig } from "@/types/types";

function MailChimpForm(props: FormConfig) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // creating an object from url params
  const defaultsByInput = props.mailChimpProps.reduce<Record<string, string>>(
    (acc, data) => {
      const urlParameterValue = searchParams.get(data.param);
      if (urlParameterValue) {
        acc[data.param] = urlParameterValue;
      }
      return acc;
    },
    {}
  );

  const stepsWithDefaults = props.steps.map((step) => {
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
  const last =
    stepsWithDefaults.length > 0 && i === stepsWithDefaults.length - 1;

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    if (!last) {
      setI((x) => Math.min(stepsWithDefaults.length - 1, x + 1));
      return;
    }

    const formData = new FormData(formEvent.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());

    const dynamicMergeFields = props.urlData.reduce<Record<string, any>>(
      (acc, data) => {
        if (dataObject[data.param]) {
          // email is never in mergefileds syntax from mailchimp...
          if (data.param.toUpperCase() === "EMAIL") return acc;
          acc[data.param.toUpperCase()] = dataObject[data.param];
        } else {
          // add meta data from url params (data not from form only from url-params)
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
        props.interests.map((i) => [i, true])
      ) as Record<string, boolean>,
      merge_fields: dynamicMergeFields,
    };

    const response = await addContact(props.listId, contactData);
    if (response.status === "subscribed") {
      router.push(props.successUrl);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {stepsWithDefaults.length === 0 ? (
        <p>Keine Steps konfiguriert.</p>
      ) : (
        stepsWithDefaults.map((step, idx) => {
          const enforceAll = last;
          return (
            <div
              key={step.stepId}
              style={{ display: idx === i ? "block" : "none" }}
            >
              {step.inputs.map((input) => (
                <div key={input.name}>
                  <label htmlFor={input.name}>
                    {input.label ?? input.name}
                  </label>
                  <input
                    id={input.name}
                    type={input.type}
                    name={input.name}
                    defaultValue={input.defaultValue}
                    required={(enforceAll || idx === i) && !!input.required}
                    disabled={!enforceAll && idx !== i}
                  />
                </div>
              ))}
            </div>
          );
        })
      )}

      {stepsWithDefaults.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button
            type="button"
            disabled={i === 0}
            onClick={() => setI((x) => Math.max(0, x - 1))}
          >
            Zurueck
          </button>

          {!last ? (
            // button is submit so the browser validates required fields
            <button type="submit">Weiter</button>
          ) : (
            <button type="submit">Abonnieren</button>
          )}
        </div>
      )}
    </form>
  );
}

export default MailChimpForm;
