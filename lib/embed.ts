"use client";

/** True when the current page is rendered inside an iframe (embed mode). */
export function isEmbedded(): boolean {
  return typeof window !== "undefined" && window.parent !== window;
}

/**
 * Navigate to the final destination after the form completes.
 *
 * When embedded in an iframe (e.g. a wepublish banner) we don't want to load
 * the target inside the small iframe — we ask the parent window (the CMS page)
 * to navigate instead, via postMessage. The embedding page listens for messages
 * of shape `{ type: "iframe:redirect", url }`.
 *
 * When not embedded, the provided `fallback` performs the normal in-page
 * navigation.
 */
export function navigateFinal(url: string, fallback: () => void): void {
  if (isEmbedded()) {
    const absolute =
      typeof window !== "undefined"
        ? new URL(url, window.location.href).href
        : url;
    window.parent.postMessage(
      { type: "iframe:redirect", url: absolute },
      "*"
    );
    return;
  }

  fallback();
}
