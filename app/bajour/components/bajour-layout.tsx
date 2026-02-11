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

// Props Definition (No raw HTML)
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

  // Visual Assets & Colors
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
    <div className={`${robotoCondensed.className} font-bold tracking-[-0.03rem] overflow-x-hidden`}>

      {/* HEADER - matches template: 200px mobile, 420px sm, 400px lg, 920px 2xl */}
      <header className="relative w-full h-[200px] sm:h-[420px] lg:h-[400px] 2xl:h-[920px] mx-auto flex flex-col justify-center items-center text-white uppercase">
        <Image
          src={props.images.header}
          alt="Header Background"
          fill
          className="object-cover object-center -z-10"
          priority
        />
        {/* Logo: max(main-width * 0.15, 72px) positioned top-left */}
        <Image 
          src={logoWhite} 
          alt="Logo White" 
          className="w-[72px] sm:w-[max(calc(100%*0.15),72px)] lg:w-[192px] 2xl:w-[288px] absolute top-6 left-8 lg:left-[max(calc((100%-1280px)/2),2rem)] 2xl:left-[max(calc((100%-1920px)/2),2rem)]"
        />
        <div className={`${roboto.className} w-full text-center font-bold`}>
          <h1 className="text-[4vh] sm:text-[6vh] lg:text-[8vh] pt-[1em]">{props.title}</h1>
          <h2 className="mt-[1em] text-[1em] sm:text-[1.2em] lg:text-[0.9em]">{props.subtitle}</h2>
        </div>
      </header>

      {/* MAIN CONTENT - matches template heights exactly */}
      <main
        className="relative mx-auto w-full max-w-full xl:max-w-[1280px] 2xl:max-w-[1920px] h-[740px] sm:h-[1300px] lg:h-[1375px] 2xl:h-[2062px]"
        style={{ backgroundColor: props.mainBackgroundColor }}
      >
        {/* --- DECORATIVE BLOBS --- */}
        {/* Top Left Blob */}
        <div className="absolute top-[-25px] sm:top-[-55px] lg:top-[-65px] 2xl:top-[-97px] left-0 lg:left-[-170px] 2xl:left-[-255px] w-[25vw] lg:w-[380px] 2xl:w-[570px] h-[350px] lg:h-[755px] 2xl:h-[1132px] bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]" />

        {/* Top Right Blob */}
        <div className="absolute top-[65px] lg:top-[110px] 2xl:top-[165px] right-0 lg:right-[-160px] 2xl:right-[-240px] w-[10vw] lg:w-[270px] 2xl:w-[405px] h-[125px] lg:h-[480px] 2xl:h-[720px] bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]" />

        {/* Bottom Left Blob - gradient changes at xl+ */}
        <div className="absolute top-[460px] sm:top-[825px] lg:top-[825px] 2xl:top-[1237px] left-0 lg:left-[-90px] 2xl:left-[-135px] w-[23vw] sm:w-[300px] lg:w-[420px] 2xl:w-[630px] h-[215px] sm:h-[400px] lg:h-[460px] 2xl:h-[690px] bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1] xl:to-[#0758a4]" />

        {/* Bottom Right Blob */}
        <div className="absolute top-[390px] sm:top-[755px] lg:top-[760px] 2xl:top-[1140px] right-0 lg:right-[-80px] 2xl:right-[-120px] w-[60px] sm:w-[290px] lg:w-[290px] 2xl:w-[435px] h-[150px] sm:h-[260px] lg:h-[440px] xl:h-[240px] 2xl:h-[360px] bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]" />

        {/* --- CONTENT SECTIONS --- */}

        {/* Lead Text */}
        <section className="absolute top-0 left-[24vw] sm:left-[28vw] lg:left-[260px] 2xl:left-[390px] w-[63vw] sm:w-[50vw] lg:w-[520px] 2xl:w-[780px] p-[0.8em]">
          <p 
            className="text-[1.2rem] sm:text-[1.3rem] lg:text-[1.6rem] 2xl:text-[1.9rem] leading-[1.2rem] sm:leading-[1.3rem] lg:leading-[1.6rem] 2xl:leading-[1.9rem]" 
            style={{ color: props.leadColor }}
          >
            {props.lead}
          </p>
        </section>

        {/* Wakeup Text - blue gradient box */}
        <section className="absolute top-[145px] sm:top-[190px] lg:top-[225px] 2xl:top-[337px] right-0 w-[65vw] lg:w-[645px] 2xl:w-[967px] h-[170px] sm:h-[295px] lg:h-[320px] 2xl:h-[480px] bg-gradient-to-br from-[#0758a4] to-[#002f49] text-white p-[1em] pl-[2em] pb-[4em]">
          <p className="text-[1.05rem] sm:text-[1.4rem] lg:text-[1.5rem] 2xl:text-[1.8rem] leading-[1.1rem] sm:leading-[1.4rem] lg:leading-[1.4rem] 2xl:leading-[1.6rem]">
            {props.wakeup.intro}
            <br />
            {props.wakeup.leadup}
            <span className="text-[1.2em] mx-1">{props.wakeup.time}</span>
            {props.wakeup.context}
          </p>
        </section>

        {/* Ready Text (Image Background) */}
        <section className="absolute top-[180px] sm:top-[250px] lg:top-[300px] 2xl:top-[450px] left-0 lg:left-[160px] 2xl:left-[240px] w-[40vw] lg:w-[520px] 2xl:w-[780px] h-[215px] sm:h-[450px] lg:h-[690px] 2xl:h-[1035px] text-white uppercase overflow-hidden">
          <Image
            src={props.images.ready}
            alt="Ready Background"
            fill
            className="object-cover object-center"
          />
          <div className="relative z-10 mt-[1em] ml-[1em] leading-[2.3em]">
            <span className="block text-[0.8em] sm:text-[1em] lg:text-[1.1em] 2xl:text-[2rem]">{props.ready.intro}</span>
            <span className="block text-[2.8em] sm:text-[3.5em] lg:text-[5em] 2xl:text-[8rem] leading-[1em]">{props.ready.time}</span>
            <span className="block text-[1em] sm:text-[1.2em] lg:text-[1.6em] 2xl:text-[2.5rem]">{props.ready.outro}</span>
          </div>
        </section>

        {/* Delivery Text - multi-color gradient: #00304b -> #2161a6 -> #ffbaba */}
        <section className="absolute top-[350px] sm:top-[545px] lg:top-[620px] 2xl:top-[930px] left-[8vw] sm:left-[25vw] lg:left-[520px] 2xl:left-[780px] w-[60vw] sm:w-[405px] lg:w-[440px] 2xl:w-[660px] h-[135px] sm:h-[245px] lg:h-[280px] 2xl:h-[420px] bg-gradient-to-tr from-[#00304b] via-[#2161a6] to-[#ffbaba] text-white p-[1em] pl-[1em]">
          <div className="text-[1.05rem] sm:text-[1.4rem] lg:text-[1.5rem] 2xl:text-[1.8rem] leading-[1.1rem] sm:leading-[1.4rem] lg:leading-[1.4rem] 2xl:leading-[1.6rem]">
            {props.delivery.intro}
            <span className="text-[1.2em] mx-1">{props.delivery.time}</span>
            {props.delivery.text}
          </div>
        </section>

        {/* Independent Text (Image Background) */}
        <section className="absolute top-[425px] sm:top-[625px] lg:top-[820px] 2xl:top-[1230px] left-[75px] sm:left-[30vw] lg:left-[640px] 2xl:left-[960px] w-[285px] sm:w-[475px] lg:w-[610px] 2xl:w-[915px] h-[215px] sm:h-[450px] lg:h-[460px] 2xl:h-[690px] flex flex-col justify-end items-end p-[1em] text-white uppercase text-right overflow-hidden">
          <Image
            src={props.images.independent}
            alt="Independent Background"
            fill
            className="object-cover object-center"
          />
          <div className="z-10">
            <span className="block text-[1em] sm:text-[1.2em] lg:text-[1.4em] 2xl:text-[2rem]">Unabhängig und</span>
            <span className="block text-[1.58em] sm:text-[2em] lg:text-[2.2em] 2xl:text-[3.5rem] leading-[1em]">kostenlos</span>
          </div>
        </section>

        {/* Subscribe Text - orange gradient */}
        <section className="absolute top-[655px] sm:top-[1115px] lg:top-[1190px] 2xl:top-[1785px] left-[8vw] sm:left-[8vw] lg:left-[220px] 2xl:left-[330px] w-[60vw] lg:w-[470px] 2xl:w-[705px] h-[115px] sm:h-[240px] lg:h-[290px] 2xl:h-[435px] bg-gradient-to-r from-[#e67964] to-[#fcb4b2] text-white p-[1em] text-[0.8em] sm:text-[1em] lg:text-[1.1em] 2xl:text-[1.5em]">
          <p dangerouslySetInnerHTML={{ __html: props.subscribeText.replace(/\n/g, '<br/>') }} />
        </section>

      </main>

      {/* FOOTER - matches template: 355px mobile, 725px sm, 610px lg */}
      <footer className="relative w-full xl:max-w-[1550px] 2xl:max-w-[2550px] mx-auto h-[355px] sm:h-[725px] lg:h-[610px] 2xl:h-[915px] flex items-center justify-center">
        <Image
          src={props.images.footer}
          alt="Footer Background"
          fill
          className="object-cover object-center -z-10"
        />
        <div className="w-[90%] max-w-[600px] mt-[5vw] 2xl:mt-[100px]">
          <Suspense fallback={null}>
            <MailchimpForm formConfig={props.formConfig} />
          </Suspense>
        </div>
      </footer>
    </div>
  );
}