import Script from "next/script";

const CMP_HOST = "b.delivery.consentmanager.net";
const CMP_CDN = "cdn.consentmanager.net";

interface ConsentManagerProps {
  /**
   * "Code-ID" (cdid) of the consentmanager.net account — found in the admin
   * under CMPs → Get CMP code. `ee45badb726a6` is the ganzgraz.at account.
   */
  cdid: string;
}

/**
 * Loads the consentmanager.net CMP, i.e. the same cookie banner, texts and
 * design as on ganzgraz.at. The consent is stored on `.ganzgraz.at`, so a
 * choice made on the main site is reused here and vice versa.
 *
 * The bundle also blocks known third-party scripts automatically, but scripts
 * we add ourselves should still be gated explicitly — see `MetaPixel`.
 *
 * Must not be rendered inside the iframe embed (`?iframe=true`); there the
 * banner of the embedding page applies.
 */
export default function ConsentManager({ cdid }: ConsentManagerProps) {
  return (
    <Script
      id="consentmanager"
      strategy="afterInteractive"
      src={`https://${CMP_CDN}/delivery/autoblocking/${cdid}.js`}
      data-cmp-ab="1"
      data-cmp-cdid={cdid}
      data-cmp-host={CMP_HOST}
      data-cmp-cdn={CMP_CDN}
      data-cmp-codesrc="1"
    />
  );
}
