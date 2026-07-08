"use client";

import { useSearchParams } from "next/navigation";
import { FormConfig } from "@/types/types";
import MailchimpForm from "./mailchimp-form";
import IframeResizer from "./iframe-resizer";

interface EmbedOrProps {
  formConfig: FormConfig;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * Renders the full landing page (`children`) normally, but when the page is
 * loaded with `?iframe=true` it renders only the signup form — suitable for
 * embedding in an iframe on an external page. `title` and `description` are
 * shown above the form in the embed.
 *
 *   https://briefing.bajour.ch/fcb/mini?iframe=true
 */
export default function EmbedOr({ formConfig, title, description, children }: EmbedOrProps) {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("iframe") === "true";

  if (!isEmbed) {
    return <>{children}</>;
  }

  return (
    <main className="p-4">
      <IframeResizer />
      {title && <h1 className="text-2xl font-bold mb-2">{title}</h1>}
      {description && <p className="mb-4">{description}</p>}
      <MailchimpForm formConfig={formConfig} />
    </main>
  );
}
