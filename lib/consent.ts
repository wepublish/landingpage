/**
 * Thin wrapper around the consentmanager.net JavaScript API (the CMP that is
 * also used on ganzgraz.at).
 *
 * Vendor IDs are the ones from the consentmanager account (Vendors list),
 * e.g. `s7` = "Facebook (Meta)", `s26` = "Google Analytics".
 *
 * https://help.consentmanager.net/books/cmp/page/checking-consent-for-a-vendor
 */

type CmpFunction = (command: string, parameter?: unknown, callback?: unknown) => unknown;

interface CmpData {
  vendorConsents?: Record<string, boolean>;
}

declare global {
  interface Window {
    __cmp?: CmpFunction;
  }
}

const POLL_INTERVAL_MS = 100;
const POLL_TIMEOUT_MS = 30_000;

function hasVendorConsent(vendorId: string): boolean {
  const cmp = window.__cmp;
  if (typeof cmp !== "function") {
    return false;
  }

  // While the CMP is still loading, `__cmp` is a stub that queues calls and
  // returns nothing — hence the optional access.
  const data = cmp("getCMPData") as CmpData | undefined;
  return Boolean(data?.vendorConsents?.[vendorId]);
}

/**
 * Calls `onConsent` once the visitor has accepted `vendorId` — either because
 * consent was already stored (the CMP cookie is set on `.ganzgraz.at`, so a
 * choice made on the main site counts here as well) or because it is given in
 * the banner. It is never called when consent is missing or refused, and at
 * most once.
 *
 * Returns a cleanup function, ready to be returned from `useEffect`.
 */
export function onVendorConsent(vendorId: string, onConsent: () => void): () => void {
  let cancelled = false;
  let notified = false;
  let waited = 0;
  let timer: ReturnType<typeof setInterval> | undefined;

  const check = () => {
    if (cancelled || notified || !hasVendorConsent(vendorId)) {
      return;
    }
    notified = true;
    onConsent();
  };

  const subscribe = () => {
    if (cancelled) {
      return;
    }
    window.__cmp?.("addEventListener", ["consent", check, false], null);
    // Consent may already have been established before we subscribed.
    check();
  };

  if (typeof window.__cmp === "function") {
    subscribe();
  } else {
    // The CMP installs `window.__cmp` only once its loader script has run,
    // which can be after this component mounts.
    timer = setInterval(() => {
      waited += POLL_INTERVAL_MS;
      if (typeof window.__cmp === "function") {
        clearInterval(timer);
        subscribe();
      } else if (waited >= POLL_TIMEOUT_MS) {
        clearInterval(timer);
      }
    }, POLL_INTERVAL_MS);
  }

  return () => {
    cancelled = true;
    clearInterval(timer);
    window.__cmp?.("removeEventListener", ["consent", check, false], null);
  };
}
