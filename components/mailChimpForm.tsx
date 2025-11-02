"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addContact } from "@/services/mailchimp.service";
import { ContactData, FormConfig } from "@/types/types";

function MailChimpForm(props: FormConfig) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const utmSource = searchParams?.get("utm_source") || "";
  const utmMedium = searchParams?.get("utm_medium") || "";
  const utmCampaign = searchParams?.get("utm_campaign") || "";

  const defaultsByInput = useMemo(() => {
    if (!props.urlData?.length) return {};
    return props.urlData.reduce<Record<string, string>>((acc, data) => {
      const value = searchParams.get(data.param);
      if (value) acc[data.input] = value;
      return acc;
    }, {});
  }, [props.urlData, searchParams]);

  const stepsWithDefaults = useMemo(() => {
    if (!Object.keys(defaultsByInput).length) return props.steps;
    return props.steps.map((step) => {
      let changed = false;
      const inputs = step.inputs.map((input) => {
        const defaultValue = defaultsByInput[input.name];
        if (!defaultValue || input.defaultValue === defaultValue) return input;
        changed = true;
        return { ...input, defaultValue };
      });
      return changed ? { ...step, inputs } : step;
    });
  }, [props.steps, defaultsByInput]);

  const [i, setI] = useState(0);
  const last =
    stepsWithDefaults.length > 0 && i === stepsWithDefaults.length - 1;

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!last) {
      setI((x) => Math.min(x + 1, Math.max(stepsWithDefaults.length - 1, 0)));
      return;
    }

    const formData = new FormData(formEvent.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());

    const contactData: ContactData = {
      email_address: (dataObject.email as string) || "",
      status: "subscribed",
      interests: props.interests,
      merge_fields: {
        UTM_SOURCE: utmSource,
        UTM_MEDIUM: utmMedium,
        UTM_CAMPAIGN: utmCampaign,
        FNAME: (dataObject.fname as string) || "",
        LNAME: (dataObject.lname as string) || "",
      },
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
