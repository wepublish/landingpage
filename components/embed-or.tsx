"use client";

import { useSearchParams } from "next/navigation";
import { FormConfig } from "@/types/types";
import MailchimpForm from "./mailchimp-form";
import IframeResizer from "./iframe-resizer";

interface EmbedOrProps {
  formConfig: FormConfig;
  children: React.ReactNode;
}

/**
 * Renders the full landing page (`children`) normally, but when the page is
 * loaded with `?iframe=true` it renders only the signup form — suitable for
 * embedding in an iframe on an external page.
 *
 *   https://briefing.bajour.ch/fcb/mini?iframe=true
 */
export default function EmbedOr({ formConfig, children }: EmbedOrProps) {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("iframe") === "true";

  if (!isEmbed) {
    return <>{children}</>;
  }

  return (
    <main className="p-4">
      <IframeResizer />
      <MailchimpForm formConfig={formConfig} />
    </main>
  );
}
