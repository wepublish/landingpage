"use client";

import { useSearchParams } from "next/navigation";
import { FormConfig } from "@/types/types";
import MailchimpForm from "./mailchimp-form";
import IframeResizer from "./iframe-resizer";

interface EmbedOrProps {
  formConfig: FormConfig;
  title?: string;
  description?: string;
  /** applied to the embed wrapper, e.g. a next/font className */
  className?: string;
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
export default function EmbedOr({ formConfig, title, description, className, children }: EmbedOrProps) {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("iframe") === "true";

  if (!isEmbed) {
    return <>{children}</>;
  }

  return (
    <main className={className ? `p-4 ${className}` : "p-4"}>
      <IframeResizer />
      {title && <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>}
      {description && <p className="mb-4 text-center">{description}</p>}
      <MailchimpForm formConfig={{ ...formConfig, autoFocus: false }} />
    </main>
  );
}
