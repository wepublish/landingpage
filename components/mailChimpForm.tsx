"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { addContact } from "@/services/mailchimp.service";
import { ContactData, FormConfig } from "@/types/types";
import { useRouter } from "next/router";

function MailChimpForm(props: FormConfig) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const utmSource = searchParams?.get("utm_source") || "";
  const utmMedium = searchParams?.get("utm_medium") || "";
  const utmCampaign = searchParams?.get("utm_campaign") || "";

  // welche inputfelder sollen generiert werden ?
  // sollen steps verwendet werden und wenn ja welche felder sind in diesen?
  // wohin soll der post gemacht werden bzw an welche listId: string; ?
  // welche daten sollen wenn vorahden an den json body angefügt werden

  const defaultsByInput = useMemo(() => {
    if (!props.urlData?.length) {
      return {};
    }

    return props.urlData.reduce<Record<string, string>>((acc, data) => {
      const value = searchParams.get(data.param);
      if (value) {
        acc[data.input] = value;
      }
      return acc;
    }, {});
  }, [props.urlData, searchParams]);

  const stepsWithDefaults = useMemo(() => {
    if (!Object.keys(defaultsByInput).length) {
      return props.steps;
    }

    return props.steps.map((step) => {
      let changed = false;

      const inputs = step.inputs.map((input) => {
        const defaultValue = defaultsByInput[input.name];
        if (!defaultValue || input.defaultValue === defaultValue) {
          return input;
        }
        changed = true;
        return { ...input, defaultValue };
      });

      if (!changed) {
        return step;
      }

      return { ...step, inputs };
    });
  }, [props.steps, defaultsByInput]);

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const formData = new FormData(formEvent.currentTarget);

    const dataObject = Object.fromEntries(formData.entries());

    const contactData: ContactData = {
      email_address: dataObject.email as string,

      status: "subscribed",
      interests: props.interests,
      merge_fields: {
        UTM_SOURCE: utmSource,
        UTM_MEDIUM: utmMedium,
        UTM_CAMPAIGN: utmCampaign,
        FNAME: dataObject.fname as string,
        LNAME: dataObject.lname as string,
      },
    };

    const response = await addContact(props.listId, contactData);
    if (response.status === "subscribed") {
      router.push(props.successUrl);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {stepsWithDefaults.map((step) => (
          <div key={step.stepId}>
            {step.inputs.map((input) => (
              <div key={input.name}>
                <label htmlFor={input.name}>{input.label ?? input.name}</label>
                <input
                  type={input.type}
                  name={input.name}
                  required={input.required}
                  defaultValue={input.defaultValue}
                ></input>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Abonnieren</button>
      </form>
    </>
  );
}

export default MailChimpForm;
