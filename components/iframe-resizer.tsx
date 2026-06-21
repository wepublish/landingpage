"use client";

import { useEffect } from "react";

/**
 * When the page is rendered inside an iframe, load the iframe-resizer child
 * runtime so the embedding page can auto-resize the iframe to fit the form
 * (its height changes between steps / success page).
 *
 * The embedding page must render the iframe with `@iframe-resizer/react`
 * (or load the matching v5 parent script). This component speaks the standard
 * iframe-resizer protocol — no custom postMessage handling is required on the
 * parent anymore.
 */
export default function IframeResizer() {
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) {
      return;
    }

    // Side-effect import: initialises the iframe-resizer child and starts
    // reporting size changes to the parent automatically.
    import("@iframe-resizer/child");
  }, []);

  return null;
}
