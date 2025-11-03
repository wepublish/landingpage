import MailChimpForm from "./mailChimpForm";
import { Step, urlData } from "@/types/types";

// hier service importiern

export interface BriefingProperties {
  title: string;
  subtitle: string;
  lead: string;
  wakeup: any;
  ready: any;
  delivery: any;
  subscribe: any;
  mainBackground: string;
  leadColor: string;
  headerBackgroundImage: string;
  readyBackgroundImage: string;
  independentBackgroundImage: string;
  footerBackgroundImage: string;
  blobBackground: string;
  subscribetextBackground: string;
  deliveryBackground: string;

  listId: string;
  interests: string[];
  urlData: urlData[];
  steps: Step[];
  successUrl: string;
}

export default function LandingPage(props: BriefingProperties) {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/baselbriefing/style.css"></link>
        <title>{props.title}</title>
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.subtitle} />
        <meta property="og:image" content={props.headerBackgroundImage} />
        <script
          async
          src="https://js.sparkloop.app/team_d0b0d810b541.js"
          data-sparkloop
        ></script>
      </head>
      <body>
        <header
          className="header"
          style={{ backgroundImage: `url(${props.headerBackgroundImage})` }}
        >
          <img className="header__logo" src="/logo_white.svg" />
          <div className="header__content">
            <h1 className="header__title">{props.title}</h1>
            <h2 className="header__subtitle">{props.subtitle}</h2>
          </div>
        </header>
        <main
          className="main"
          style={{ backgroundColor: props.mainBackground }}
        >
          <div
            className="pinkblob pinkblob--topleft"
            style={{ background: props.blobBackground }}
          />
          <div
            className="pinkblob pinkblob--topright"
            style={{ background: props.blobBackground }}
          />
          <section className="leadtext" style={{ color: props.leadColor }}>
            <p className="leadtext__text">{props.lead}</p>
          </section>
          <section className="wakeuptext">
            <div dangerouslySetInnerHTML={props.wakeup} />
          </section>
          <div
            className="pinkblob pinkblob--bottomleft"
            style={{ background: props.blobBackground }}
          />
          <div
            className="pinkblob pinkblob--bottomright"
            style={{ background: props.blobBackground }}
          />
          <section
            className="readytext"
            style={{ backgroundImage: `url(${props.readyBackgroundImage})` }}
          >
            <div dangerouslySetInnerHTML={props.ready} />
          </section>
          <section
            className="independenttext"
            style={{
              backgroundImage: `url(${props.independentBackgroundImage})`,
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
            style={{ background: props.deliveryBackground }}
          >
            <div dangerouslySetInnerHTML={props.delivery} />
          </section>
          <section
            className="subscribetext"
            style={{ background: props.subscribetextBackground }}
          >
            <div dangerouslySetInnerHTML={props.subscribe} />
          </section>
        </main>
        <footer
          className="footer"
          style={{ backgroundImage: `url(${props.footerBackgroundImage})` }}
        >
          {/* Hier dann die services an client component runter geben */}
          <MailChimpForm
            listId={props.listId}
            interests={
              Object.fromEntries(
                props.interests.map((i) => [i, true])
              ) as Record<string, boolean>
            }
            urlData={props.urlData}
            steps={props.steps}
            successUrl={props.successUrl}
          />
        </footer>
      </body>
    </>
  );
}
