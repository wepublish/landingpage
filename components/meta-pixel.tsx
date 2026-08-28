"use client";

import { useEffect } from "react";

import { onVendorConsent } from "@/lib/consent";

interface MetaPixelProps {
  pixelId: string;
  /**
   * consentmanager vendor ID that has to be accepted before the pixel is
   * loaded. Only leave this out on domains without a CMP: then the pixel is loaded
   * immediately.
   */
  consentVendorId?: string;
}

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** The official Meta pixel snippet, as code instead of an inline script. */
function loadPixel(pixelId: string) {
  if (window.fbq) {
    return;
  }

  const fbq: Fbq = (...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue?.push(args);
    }
  };
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", pixelId);
  fbq("track", "PageView");
}

export default function MetaPixel({ pixelId, consentVendorId }: MetaPixelProps) {
  useEffect(() => {
    if (!consentVendorId) {
      loadPixel(pixelId);
      return;
    }

    return onVendorConsent(consentVendorId, () => loadPixel(pixelId));
  }, [pixelId, consentVendorId]);

  if (consentVendorId) {
    // Without JavaScript there is no consent either, so no noscript fallback.
    return null;
  }

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
