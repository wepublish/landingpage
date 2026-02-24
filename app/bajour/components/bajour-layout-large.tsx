import Image, { StaticImageData } from "next/image";
import { Roboto, Roboto_Condensed } from "next/font/google";
import { FormConfig } from "@/types/types";
import logoWhite from "./logo_white.svg";
import { Suspense } from "react";
import MailchimpForm from "@/components/mailchimp-form";

// Font Configuration
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-condensed",
});

interface BajourLayoutLargeProps {
  title: string;
  subtitle: string;
  lead: string;

  wakeup: {
    intro: string; // "Wir von Bajour nehmen..."
    leadup: string; // "Wir stehen für dich um"
    time: string;  // "3:00"
    context: string; // "Uhr auf"
  };
  ready: {
    intro: string; // "Jeden Morgen ab"
    time: string;  // "06:00"
    outro: string; // "für dich bereit"
  };
  delivery: {
    intro: string; // "und schicken dir um"
    time: string;  // "6 Uhr"
    text: string;  // "die wichtigsten..."
  };
  subscribeText: string;
  mainBackgroundColor: string;
  leadColor: string;
  images: {
    header: StaticImageData;
    ready: StaticImageData;
    independent: StaticImageData;
    footer: StaticImageData;
  };

  formConfig: FormConfig;
}

export default function BajourLayoutLarge(props: BajourLayoutLargeProps) {
  return (
    // ROOT WRAPPER
    // Sets the base font-size and line-height for everything, matching :root variables exactly.
    // Base: 1.05rem / 1.1rem
    // sm: 1.4rem / 1.4rem
    // lg: 1.5rem / 1.4rem
    // 2xl: 1.8rem / 1.6rem
    <div className={`
      ${robotoCondensed.className} font-bold tracking-[-0.03rem] overflow-x-hidden w-full
      text-[1.05rem] leading-[1.1rem]
      sm:text-[1.4rem] sm:leading-[1.4rem]
      lg:text-[1.5rem]
      2xl:text-[1.8rem] 2xl:leading-[1.6rem]
    `}>
      {/* HEADER */}
      {/* 200px -> 420px (sm) -> 400px (lg) -> 920px (2xl) */}
      <header className="relative w-full mx-auto flex flex-col justify-center items-center text-white uppercase px-[2rem] py-[1.5rem]
        h-[200px]
        sm:h-[420px]
        lg:h-[400px]
        2xl:h-[920px]
      ">
        <Image
          src={props.images.header}
          alt="Header Background"
          fill
          className="object-cover object-center -z-10"
          priority
        />
        {/* Logo */}
        <Image
          src={logoWhite}
          alt="Logo White"
          className="absolute top-[1.5rem]
          w-[max(15vw,72px)]
          lg:w-[192px]
          2xl:w-[288px]
          left-[2rem]
          lg:left-[max(calc((100%-1280px)/2),2rem)]
          2xl:left-[max(calc((100%-1920px)/2),2rem)]"
        />
        {/* Title & Subtitle - Roboto Font */}
        <div className={`${roboto.className} w-full text-center font-bold`}>
          {/* Title: 4vh -> 6vh -> 8vh */}
          <h1 className="pt-[1em] leading-[1.1rem]
            text-[4vh] lg:text-[4.5rem]
            sm:text-[6vh]
            lg:text-[8vh]"
          >
            {props.title}
          </h1>
          {/* Subtitle: 1em -> 1.2em -> 0.9em */}
          <h2 className="mt-[1em] leading-normal
            text-[1em] lg:text-[2rem]
            sm:text-[1.2em]
            lg:text-[0.9em]"
          >
            {props.subtitle}
          </h2>
        </div>
      </header>
      {/* MAIN CONTENT */}
      <main
        className="relative mx-auto w-full
        xl:max-w-[1280px]
        2xl:max-w-[1920px]
        h-[740px]
        sm:h-[1300px]
        lg:h-[1375px]
        2xl:h-[2062px]"
        style={{ backgroundColor: props.mainBackgroundColor }}
      >
        {/* Top Left */}
        <div className="absolute bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]
          top-[-25px] left-0 w-[25vw] h-[350px]
          sm:top-[-55px]
          lg:top-[-65px] lg:left-[-170px] lg:w-[380px] lg:h-[755px]
          2xl:top-[-97px] 2xl:left-[-255px] 2xl:w-[570px] 2xl:h-[1132px]"
        />
        {/* Top Right */}
        <div className="absolute bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]
          top-[65px] right-0 w-[10vw] h-[125px]
          lg:top-[110px] lg:right-[-160px] lg:w-[270px] lg:h-[480px]
          2xl:top-[165px] 2xl:right-[-240px] 2xl:w-[405px] 2xl:h-[720px]"
        />
        {/* Bottom Left */}
        <div className="absolute bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1] xl:to-[#0758a4]
          top-[460px] left-0 w-[23vw] h-[215px]
          sm:top-[825px] sm:w-[300px] sm:h-[400px]
          lg:top-[825px] lg:left-[-90px] lg:w-[420px] lg:h-[460px]
          2xl:top-[1237px] 2xl:left-[-135px] 2xl:w-[630px] 2xl:h-[690px]"
        />
        {/* Bottom Right */}
        <div className="absolute bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]
          top-[390px] right-0 w-[60px] h-[150px]
          sm:top-[755px] sm:w-[290px] sm:h-[260px]
          lg:top-[760px] lg:right-[-80px] lg:h-[440px]
          xl:h-[240px]
          2xl:top-[1140px] 2xl:right-[-120px] 2xl:w-[435px] 2xl:h-[360px]"
        />
        {/* --- TEXT SECTIONS --- */}
        {/* Lead Text */}
        {/* Font: 1.2rem -> 1.3rem -> 1.6rem -> 1.9rem */}
        <section className="absolute p-[0.8em]
          top-0
          left-[24vw] w-[63vw] text-[1.2rem] leading-[1.2rem] lg:text-[2.3rem] lg:leading-[2.3rem]
          sm:left-[28vw] sm:w-[50vw] sm:text-[1.3rem] sm:leading-[1.3rem]
          lg:left-[260px] lg:w-[520px] lg:text-[1.6rem] lg:leading-[1.6rem]
          2xl:left-[390px] 2xl:w-[780px] 2xl:text-[1.9rem] 2xl:leading-[1.9rem]
        ">
          <p style={{ color: props.leadColor }}>
            {props.lead}
          </p>
        </section>
        {/* Wakeup Text */}
        {/* Inherits root font size. Time span is 1.2em. */}
        <section className="absolute bg-gradient-to-br from-[#0758a4] to-[#002f49] text-white pl-[2em] lg:pl-[4rem] pt-[1em] pr-[1em] pb-[4em]
          lg:text-[2.3rem] lg:leading-[2.3rem]
          right-0 top-[145px] w-[65vw] h-[170px]
          sm:top-[190px] sm:h-[295px]
          lg:top-[225px] lg:w-[645px] lg:h-[320px]
          2xl:top-[337px] 2xl:w-[967px] 2xl:h-[480px]
        ">
          <div className="font-bold">
            <span dangerouslySetInnerHTML={{ __html: props.wakeup.intro }} />
            <br />
            {props.wakeup.leadup}
            <span className="text-[1.2em] mx-1">{props.wakeup.time}</span>
            {props.wakeup.context}
          </div>
        </section>
        {/* Ready Text */}
        <section className="absolute text-white uppercase leading-[2.3em]
          top-[180px] left-0 w-[40vw] h-[215px]
          sm:top-[250px] sm:h-[450px]
          lg:top-[300px] lg:left-[160px] lg:w-[520px] lg:h-[690px]
          2xl:top-[450px] 2xl:left-[240px] 2xl:w-[780px] 2xl:h-[1035px]
        ">
          <Image src={props.images.ready} alt="Ready Background" fill className="object-cover object-center" />
          <div className="relative mt-[1em] ml-[1em] lg:mt-[2.5rem] lg:ml-[2.5rem]">
            <span className="block
              text-[0.8em] lg:text-[2.3rem]
              leading-[1.1rem]
              lg:text-[1.1em]
              2xl:text-[2rem]"
            >
              {props.ready.intro}
            </span>
            <span className="block leading-[1em]
              text-[2.8em] lg:text-[11rem]
              lg:text-[5em]
              2xl:text-[8rem]"
            >
              {props.ready.time}
            </span>
            <span className="block
              text-[1em] lg:text-[3.5rem]
              leading-[1.1rem]
              lg:text-[1.6em]
              2xl:text-[2.5rem]"
            >
              {props.ready.outro}
            </span>
          </div>
        </section>
        {/* Delivery Text */}
        <section className="absolute z-10 bg-gradient-to-tr from-[#00304b] via-[#2161a6] to-[#ffbaba] text-white
          top-[350px] left-[8vw] w-[60vw] h-[135px] lg:text-[2.3rem] lg:leading-[2.3rem]
          sm:top-[545px] sm:left-[25vw] sm:w-[405px] sm:h-[245px]
          lg:top-[620px] lg:left-[520px] lg:w-[440px] lg:h-[280px]
          2xl:top-[930px] 2xl:left-[780px] 2xl:w-[660px] 2xl:h-[420px]
        ">
          <div className="mt-[1em] mr-[1em] mb-0 ml-[1em]">
            {props.delivery.intro}
            <br />
            <span className="text-[1.2em] mx-1">{props.delivery.time}</span>
            {props.delivery.text}
          </div>
        </section>
        {/* Independent Text */}
        <section className="absolute flex flex-col justify-end items-end p-[1em] text-white uppercase text-right
          top-[425px] left-[75px] w-[285px] h-[215px]
          sm:top-[625px] sm:left-[30vw] sm:w-[475px] sm:h-[450px]
          lg:top-[820px] lg:left-[640px] lg:w-[610px] lg:h-[460px]
          2xl:top-[1230px] 2xl:left-[960px] 2xl:w-[915px] 2xl:h-[690px]
        ">
          <Image src={props.images.independent} alt="Independent Background" fill className="object-cover object-center" />
          <div className="relative">
            <span className="block
              text-[1em]
              sm:text-[1.2em]
              lg:text-[1.4em]
              2xl:text-[2rem]"
            >
              Unabhängig und
            </span>
            <span className="block leading-[1em]
              text-[1.58em]
              sm:text-[2em]
              lg:text-[2.2em]
              2xl:text-[3.5rem]"
            >
              kostenlos
            </span>
          </div>
        </section>
        {/* Subscribe Text */}
        <section className="absolute bg-gradient-to-r from-[#e67964] to-[#fcb4b2] text-white
          pt-[5vw] pr-[1em] pb-[5em] pl-[1em] lg:text-[2.3rem] lg:leading-[2.3rem]
          lg:pt-[64px] 2xl:pt-[96px]
          top-[655px] left-[8vw] w-[60vw] h-[115px] text-[1.1rem]
          sm:top-[1115px] sm:h-[240px] sm:text-[1em]
          lg:top-[1190px] lg:left-[220px] lg:w-[470px] lg:h-[290px] lg:text-[1.1em]
          2xl:top-[1785px] 2xl:left-[330px] 2xl:w-[705px] 2xl:h-[435px] 2xl:text-[1.5em]
        ">
          <div dangerouslySetInnerHTML={{ __html: props.subscribeText.replace(/\n/g, '<br/>') }} />
        </section>
      </main>
      {/* FOOTER */}
      <footer className="relative w-full mx-auto flex items-center justify-center p-[min(5vw,100px)] px-[3vw]
        xl:max-w-[1550px]
        2xl:max-w-[2550px]
        h-[500px]
        sm:h-[725px]
        lg:h-[610px]
        2xl:h-[915px]
      ">
        <Image src={props.images.footer} alt="Footer Background" fill className="object-cover object-center -z-10" />
        <div className="w-[90%] max-w-[600px] mt-[5vw] 2xl:mt-[100px]">
          <Suspense fallback={null}>
            <MailchimpForm formConfig={props.formConfig} />
          </Suspense>
        </div>
      </footer>
    </div>
  );
}
