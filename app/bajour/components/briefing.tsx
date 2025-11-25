import { Suspense } from "react";
import MailchimpForm from "../../../components/mailchimp-form";
import { FormConfig, HtmlContent } from "@/types/types";
import Image, { StaticImageData } from 'next/image';
import logoWhite from "./logo_white.svg";
import styles from "./style.module.css";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"]
});

// hier service importiern

export interface BriefingProps {
  title: string;
  subtitle: string;
  lead: string;
  wakeup: HtmlContent;
  ready: HtmlContent;
  delivery: HtmlContent;
  subscribe: HtmlContent;
  mainBackground: string;
  leadColor: string;
  headerBackgroundImage: StaticImageData;
  readyBackgroundImage: StaticImageData;
  independentBackgroundImage: StaticImageData;
  footerBackgroundImage: StaticImageData;
  blobBackground: string;
  subscribetextBackground: string;
  deliveryBackground: string;
  formConfig: FormConfig;
}

export default function Briefing(props: BriefingProps) {
  return (
    <div className={`${styles.scope} ${robotoCondensed.className}`}>
      <header className={`z-1 ${styles.header}`}>
        <Image src={props.headerBackgroundImage} alt="" fill className="-z-10" />
        <Image src={logoWhite} alt="Logo White" className="w-16 absolute inset-6" />
        <div className={styles.header__content}>
          <h1 className={styles.header__title}>{props.title}</h1>
          <h2 className={styles.header__subtitle}>{props.subtitle}</h2>
        </div>
      </header>
      <main className={`${styles.main} bg-[${props.mainBackground}]`}>
        <div className={`z-2 ${styles.pinkblob} ${styles["pinkblob--topleft"]} bg-[${props.blobBackground}]`} />
        <div className={`z-2 ${styles.pinkblob} ${styles["pinkblob--topright"]} bg-[${props.blobBackground}]`} />
        <section className={`z-3 ${styles.leadtext} text-[${props.leadColor}]`}>
          <p className={styles.leadtext__text}>{props.lead}</p>
        </section>
        <section className={`z-4 ${styles.wakeuptext}`}>
          <div dangerouslySetInnerHTML={props.wakeup} />
        </section>
        <div className={`z-2 ${styles.pinkblob} ${styles["pinkblob--bottomleft"]} bg-[${props.blobBackground}]`} />
        <div className={`z-2 ${styles.pinkblob} ${styles["pinkblob--bottomright"]} bg-[${props.blobBackground}]`} />
        <section className={`z-5 ${styles.readytext}`}>
          <Image src={props.readyBackgroundImage} alt="" fill className="-z-10" />
          <div dangerouslySetInnerHTML={props.ready} />
        </section>
        <section className={`z-6 ${styles.independenttext}`}>
          <Image src={props.independentBackgroundImage} alt="" fill className="-z-10" />
          <p>
            <span className={styles["independenttext--independent"]}>
              Unabhängig und
            </span>
            <br />
            <span className={styles["independenttext--free"]}>kostenlos</span>
          </p>
        </section>
        <section className={`z-7 ${styles.deliverytext} bg-[${props.deliveryBackground}]`} >
          <div dangerouslySetInnerHTML={props.delivery} />
        </section>
        <section className={`z-7 ${styles.subscribetext} bg-[${props.subscribetextBackground}]`}>
          <div dangerouslySetInnerHTML={props.subscribe} />
        </section>
      </main>
      <footer className={styles.footer}>
        <Image src={props.footerBackgroundImage} alt="" fill className="-z-10" />
        <Suspense fallback={null}>
          <MailchimpForm formConfig={props.formConfig} />
        </Suspense>
      </footer>
    </div>
  );
}
