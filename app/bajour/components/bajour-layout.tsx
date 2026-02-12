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

interface BajourLayoutContentProps {
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

export default function BajourLayout(props: BajourLayoutContentProps) {
  return (
    // ROOT WRAPPER
    // Sets the base font-size and line-height for everything, matching :root variables exactly.
    // Base: 1.05rem / 1.1rem
    // 600px: 1.4rem / 1.4rem
    // 960px: 1.5rem / 1.4rem
    // 2048px: 1.8rem / 1.6rem
    <div className={`
      ${robotoCondensed.className} font-bold tracking-[-0.03rem] overflow-x-hidden w-full
      text-[1.05rem] leading-[1.1rem]
      min-[600px]:text-[1.4rem] min-[600px]:leading-[1.4rem]
      min-[960px]:text-[1.5rem]
      min-[2048px]:text-[1.8rem] min-[2048px]:leading-[1.6rem]
    `}>
      {/* HEADER */}
      {/* 200px -> 420px (600px) -> 400px (960px) -> 920px (2048px) */}
      <header className="relative w-full mx-auto flex flex-col justify-center items-center text-white uppercase px-[2rem] py-[1.5rem]
        h-[200px]
        min-[600px]:h-[420px]
        min-[960px]:h-[400px]
        min-[2048px]:h-[920px]
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
          min-[960px]:w-[192px]
          min-[2048px]:w-[288px]
          left-[2rem]
          min-[960px]:left-[max(calc((100%-1280px)/2),2rem)]
          min-[2048px]:left-[max(calc((100%-1920px)/2),2rem)]"
        />
        {/* Title & Subtitle - Roboto Font */}
        <div className={`${roboto.className} w-full text-center font-bold`}>
          {/* Title: 4vh -> 6vh -> 8vh */}
          <h1 className="pt-[1em] leading-[1.1rem]
            text-[4vh] lg:text-[4.5rem]
            min-[600px]:text-[6vh]
            min-[960px]:text-[8vh]"
          >
            {props.title}
          </h1>
          {/* Subtitle: 1em -> 1.2em -> 0.9em */}
          <h2 className="mt-[1em] leading-normal
            text-[1em] lg:text-[2rem]
            min-[600px]:text-[1.2em]
            min-[960px]:text-[0.9em]"
          >
            {props.subtitle}
          </h2>
        </div>
      </header>
      {/* MAIN CONTENT */}
      <main
        className="relative mx-auto w-full
        min-[1280px]:max-w-[1280px]
        min-[2048px]:max-w-[1920px]
        h-[740px]
        min-[600px]:h-[1300px]
        min-[960px]:h-[1375px]
        min-[2048px]:h-[2062px]"
        style={{ backgroundColor: props.mainBackgroundColor }}
      >
        {/* Top Left */}
        <div className="absolute bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]
          top-[-25px] left-0 w-[25vw] h-[350px]
          min-[600px]:top-[-55px]
          min-[960px]:top-[-65px] min-[960px]:left-[-170px] min-[960px]:w-[380px] min-[960px]:h-[755px]
          min-[2048px]:top-[-97px] min-[2048px]:left-[-255px] min-[2048px]:w-[570px] min-[2048px]:h-[1132px]"
        />
        {/* Top Right */}
        <div className="absolute bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]
          top-[65px] right-0 w-[10vw] h-[125px]
          min-[960px]:top-[110px] min-[960px]:right-[-160px] min-[960px]:w-[270px] min-[960px]:h-[480px]
          min-[2048px]:top-[165px] min-[2048px]:right-[-240px] min-[2048px]:w-[405px] min-[2048px]:h-[720px]"
        />
        {/* Bottom Left */}
        <div className="absolute bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1] min-[1280px]:to-[#0758a4]
          top-[460px] left-0 w-[23vw] h-[215px]
          min-[600px]:top-[825px] min-[600px]:w-[300px] min-[600px]:h-[400px]
          min-[960px]:top-[825px] min-[960px]:left-[-90px] min-[960px]:w-[420px] min-[960px]:h-[460px]
          min-[2048px]:top-[1237px] min-[2048px]:left-[-135px] min-[2048px]:w-[630px] min-[2048px]:h-[690px]"
        />
        {/* Bottom Right */}
        <div className="absolute bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]
          top-[390px] right-0 w-[60px] h-[150px]
          min-[600px]:top-[755px] min-[600px]:w-[290px] min-[600px]:h-[260px]
          min-[960px]:top-[760px] min-[960px]:right-[-80px] min-[960px]:h-[440px]
          min-[1280px]:h-[240px]
          min-[2048px]:top-[1140px] min-[2048px]:right-[-120px] min-[2048px]:w-[435px] min-[2048px]:h-[360px]"
        />
        {/* --- TEXT SECTIONS --- */}
        {/* Lead Text */}
        {/* Font: 1.2rem -> 1.3rem -> 1.6rem -> 1.9rem */}
        <section className="absolute p-[0.8em]
          top-0
          left-[24vw] w-[63vw] text-[1.2rem] leading-[1.2rem] lg:text-[2.3rem] lg:leading-[2.3rem]
          min-[600px]:left-[28vw] min-[600px]:w-[50vw] min-[600px]:text-[1.3rem] min-[600px]:leading-[1.3rem]
          min-[960px]:left-[260px] min-[960px]:w-[520px] min-[960px]:text-[1.6rem] min-[960px]:leading-[1.6rem]
          min-[2048px]:left-[390px] min-[2048px]:w-[780px] min-[2048px]:text-[1.9rem] min-[2048px]:leading-[1.9rem]
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
          min-[600px]:top-[190px] min-[600px]:h-[295px]
          min-[960px]:top-[225px] min-[960px]:w-[645px] min-[960px]:h-[320px]
          min-[2048px]:top-[337px] min-[2048px]:w-[967px] min-[2048px]:h-[480px]
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
          min-[600px]:top-[250px] min-[600px]:h-[450px]
          min-[960px]:top-[300px] min-[960px]:left-[160px] min-[960px]:w-[520px] min-[960px]:h-[690px]
          min-[2048px]:top-[450px] min-[2048px]:left-[240px] min-[2048px]:w-[780px] min-[2048px]:h-[1035px]
        ">
          <Image src={props.images.ready} alt="Ready Background" fill className="object-cover object-center" />
          <div className="relative mt-[1em] ml-[1em] lg:mt-[2.5rem] lg:ml-[2.5rem]">
            <span className="block
              text-[0.8em] lg:text-[2.3rem]
              leading-[1.1rem]
              min-[960px]:text-[1.1em]
              min-[2048px]:text-[2rem]"
            >
              {props.ready.intro}
            </span>
            <span className="block leading-[1em]
              text-[2.8em] lg:text-[11rem]
              min-[960px]:text-[5em]
              min-[2048px]:text-[8rem]"
            >
              {props.ready.time}
            </span>
            <span className="block
              text-[1em] lg:text-[3.5rem]
              leading-[1.1rem]
              min-[960px]:text-[1.6em]
              min-[2048px]:text-[2.5rem]"
            >
              {props.ready.outro}
            </span>
          </div>
        </section>
        {/* Delivery Text */}
        <section className="absolute z-10 bg-gradient-to-tr from-[#00304b] via-[#2161a6] to-[#ffbaba] text-white
          top-[350px] left-[8vw] w-[60vw] h-[135px] lg:text-[2.3rem] lg:leading-[2.3rem]
          min-[600px]:top-[545px] min-[600px]:left-[25vw] min-[600px]:w-[405px] min-[600px]:h-[245px]
          min-[960px]:top-[620px] min-[960px]:left-[520px] min-[960px]:w-[440px] min-[960px]:h-[280px]
          min-[2048px]:top-[930px] min-[2048px]:left-[780px] min-[2048px]:w-[660px] min-[2048px]:h-[420px]
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
          min-[600px]:top-[625px] min-[600px]:left-[30vw] min-[600px]:w-[475px] min-[600px]:h-[450px]
          min-[960px]:top-[820px] min-[960px]:left-[640px] min-[960px]:w-[610px] min-[960px]:h-[460px]
          min-[2048px]:top-[1230px] min-[2048px]:left-[960px] min-[2048px]:w-[915px] min-[2048px]:h-[690px]
        ">
          <Image src={props.images.independent} alt="Independent Background" fill className="object-cover object-center" />
          <div className="relative">
            <span className="block
              text-[1em]
              min-[600px]:text-[1.2em]
              min-[960px]:text-[1.4em]
              min-[2048px]:text-[2rem]"
            >
              Unabhängig und
            </span>
            <span className="block leading-[1em]
              text-[1.58em]
              min-[600px]:text-[2em]
              min-[960px]:text-[2.2em]
              min-[2048px]:text-[3.5rem]"
            >
              kostenlos
            </span>
          </div>
        </section>
        {/* Subscribe Text */}
        <section className="absolute bg-gradient-to-r from-[#e67964] to-[#fcb4b2] text-white
          pt-[5vw] pr-[1em] pb-[5em] pl-[1em] lg:text-[2.3rem] lg:leading-[2.3rem]
          min-[960px]:pt-[64px] min-[2048px]:pt-[96px]
          top-[655px] left-[8vw] w-[60vw] h-[115px] text-[1.1rem]
          min-[600px]:top-[1115px] min-[600px]:h-[240px] min-[600px]:text-[1em]
          min-[960px]:top-[1190px] min-[960px]:left-[220px] min-[960px]:w-[470px] min-[960px]:h-[290px] min-[960px]:text-[1.1em]
          min-[2048px]:top-[1785px] min-[2048px]:left-[330px] min-[2048px]:w-[705px] min-[2048px]:h-[435px] min-[2048px]:text-[1.5em]
        ">
          <div dangerouslySetInnerHTML={{ __html: props.subscribeText.replace(/\n/g, '<br/>') }} />
        </section>
      </main>
      {/* FOOTER */}
      <footer className="relative w-full mx-auto flex items-center justify-center p-[min(5vw,100px)] px-[3vw]
        min-[1280px]:max-w-[1550px]
        min-[2048px]:max-w-[2550px]
        h-[355px]
        min-[600px]:h-[725px]
        min-[960px]:h-[610px]
        min-[2048px]:h-[915px]
      ">
        <Image src={props.images.footer} alt="Footer Background" fill className="object-cover object-center -z-10" />
        <div className="w-[90%] max-w-[600px] mt-[5vw] min-[2048px]:mt-[100px]">
          <Suspense fallback={null}>
            <MailchimpForm formConfig={props.formConfig} />
          </Suspense>
        </div>
      </footer>
    </div>
  );
}
