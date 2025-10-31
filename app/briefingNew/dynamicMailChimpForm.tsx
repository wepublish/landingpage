"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { addContact, getGroupIds } from "@/services/mailchimp.service";

async function fetchGroups() {
  const listId = "851436c80e";

  const response = await getGroupIds(listId);

  return response;
}

function DynamicMailChimpForm(props: FormConfig) {
  const searchParams = useSearchParams();
  const [formConfig, setFormConfig] = useState<FormConfig>(props);

  const utmSource = searchParams?.get("utm_source") || "";
  const utmMedium = searchParams?.get("utm_medium") || "";
  const utmCampaign = searchParams?.get("utm_campaign") || "";

  // welche inputfelder sollen generiert werden ?
  // sollen steps verwendet werden und wenn ja welche felder sind in diesen?
  // wohin soll der post gemacht werden bzw an welche listId: string; ?
  // welche daten sollen wenn vorahden an den json body angefügt werden

  useEffect(() => {
    console.log(props.interests);
    fetchGroups();
  }, []);

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    const listId = "851436c80e";

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
      },
    };

    const response = await addContact(listId, contactData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {props.steps.map((step) => (
          <div key={step.stepId}>
            {step.inputs.map((input) => (
              <div key={input.name}>
                <label htmlFor={input.name}>{input.name}</label>
                <input
                  type={input.type}
                  name={input.name}
                  required={input.required}
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

export default DynamicMailChimpForm;
