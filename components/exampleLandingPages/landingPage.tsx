import { Suspense } from "react";
import MailChimpForm from "../mailChimpForm";
import { BriefingProperties } from "@/types/types";

export default function LandingPage(props: BriefingProperties) {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/baselbriefing/style.css"></link>
        <title>Basel Briefing</title>
        <meta property="og:title" content="Basel Briefing" />
        <meta
          property="og:description"
          content="Das Wichtigste für den Start in den Tag"
        />
        <meta
          property="og:image"
          content="/baselbriefing/images/bb-header-scaled.webp"
        />
        <script
          async
          src="https://js.sparkloop.app/team_d0b0d810b541.js"
          data-sparkloop
        ></script>
      </head>
      <body>
        <header
          className="header"
          style={{
            backgroundImage: "url(/baselbriefing/images/bb-header-scaled.webp)",
          }}
        >
          <img className="header__logo" src="/logo_white.svg" />
          <div className="header__content">
            <h1 className="header__title">Basel Briefing</h1>
            <h2 className="header__subtitle">
              Das Wichtigste für den Start in den Tag
            </h2>
          </div>
        </header>
        <main className="main" style={{ backgroundColor: "#feeae3" }}>
          <div
            className="pinkblob pinkblob--topleft"
            style={{
              background:
                "linear-gradient(to right top, var(--gradient-pink-dark), var(--gradient-pink-bright))",
            }}
          />
          <div
            className="pinkblob pinkblob--topright"
            style={{
              background:
                "linear-gradient(to right top, var(--gradient-pink-dark), var(--gradient-pink-bright))",
            }}
          />
          <section className="leadtext" style={{ color: "black" }}>
            <p className="leadtext__text">
              Du willst wissen, was in Basel läuft, hast aber keine Lust, dich
              durch die Zeitungen und Online-Portale zu pflügen?
            </p>
          </section>
          <section className="wakeuptext">
            <div>
              Wir von Bajour nehmen
              <br />
              dir diese Arbeit ab.
              <br />
              Wir stehen für dich werktags
              <br />
              um <span className="wakeuptext--time">3:00</span> Uhr auf
            </div>
          </section>
          <div
            className="pinkblob pinkblob--bottomleft"
            style={{
              background:
                "linear-gradient(to right top, var(--gradient-pink-dark), var(--gradient-pink-bright))",
            }}
          />
          <div
            className="pinkblob pinkblob--bottomright"
            style={{
              background:
                "linear-gradient(to right top, var(--gradient-pink-dark), var(--gradient-pink-bright))",
            }}
          />
          <section
            className="readytext"
            style={{
              backgroundImage:
                "url(/baselbriefing/images/bb-ready-scaled.webp)",
            }}
          >
            <div>
              <span className="readytext--everyday">Jeden Morgen ab</span>
              <br />
              <span className="readytext--time">06:00</span>
              <br />
              <span className="readytext--ready">für dich bereit</span>
            </div>
          </section>
          <section
            className="independenttext"
            style={{
              backgroundImage:
                "url(/baselbriefing/images/bb-independent-scaled.webp)",
            }}
          >
            <p>
              <span className="independenttext--independent">
                Unabhängig und
              </span>
              <br />
              <span className="independenttext--free">kostenlos</span>
            </p>
          </section>
          <section
            className="deliverytext"
            style={{
              background:
                "linear-gradient(to top right, #00304b, #2161a6, #ffbaba)",
            }}
          >
            <div>
              und schicken dir
              <br />
              um <span className="deliverytext--time">6 Uhr</span> die
              wichtigsten
              <br />
              regionalen Tagesnews
              <br />
              plus unseren Senf dazu
              <br />
              per Mail.
            </div>
          </section>
          <section
            className="subscribetext"
            style={{
              background:
                "linear-gradient(to right, var(--gradient-orange-dark), var(--gradient-orange-bright))",
            }}
          >
            <div>
              jetzt anmelden und immer
              <br />
              bestens informiert sein!
            </div>
          </section>
        </main>
        <footer
          className="footer"
          style={{
            backgroundImage: "url(/baselbriefing/images/bb-footer-scaled.webp)",
          }}
        >
          <Suspense fallback={null}>
            <MailChimpForm
              listId={props.listId}
              interests={
                Object.fromEntries(
                  props.interests.map((i) => [i, true])
                ) as Record<string, boolean>
              }
              urlData={props.mailChimpProps}
              steps={props.steps}
              successUrl={props.successUrl}
            />
          </Suspense>
        </footer>
      </body>
    </>
  );
}
