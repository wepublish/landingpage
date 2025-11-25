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
interface BriefingContentProps {
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

export default function Briefing(props: BriefingContentProps) {
  return (
    <div className="text-[#1a1a1a] overflow-x-hidden">

      {/* HEADER */}
      <header className={`${roboto.className} relative w-full h-[50vw] lg:h-[33vw] flex flex-col justify-center items-center text-white uppercase`}>
        <Image
          src={props.images.header}
          alt="Header Background"
          fill
          className="object-cover -z-10"
          priority
        />
        <Image src={logoWhite} alt="Logo White" className="w-[24vw] lg:w-[12vw] absolute inset-6" />
        <div className="z-10 text-center font-bold leading-none">
          <h1 className="text-[7vw] pt-4 tracking-tight">{props.title}</h1>
          <h2 className="mt-2 text-[4vw] lg:text-[3vw] tracking-tight ">{props.subtitle}</h2>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        className="relative mx-auto w-full max-w-[1920px] h-[740px] sm:h-[1300px] lg:h-[1375px] xl:h-[1450px] 2xl:h-[1900px]"
        style={{ backgroundColor: props.mainBackgroundColor }}
      >
        {/* --- DECORATIVE BLOBS --- */}
        {/* Top Left */}
        <div className="absolute top-[-25px] sm:top-[-55px] lg:top-[-65px] left-0 xl:left-[-90px] w-[25vw] sm:w-[25vw] xl:w-[220px] 2xl:w-[300px] h-[350px] lg:h-[755px] bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]" />

        {/* Top Right */}
        <div className="absolute top-[65px] lg:top-[110px] right-0 xl:right-[-160px] w-[10vw] lg:w-[270px] h-[125px] lg:h-[480px] bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]" />

        {/* Bottom Left */}
        <div className="absolute top-[460px] sm:top-[825px] lg:top-[825px] left-0 lg:left-[-90px] w-[23vw] sm:w-[300px] lg:w-[420px] h-[215px] sm:h-[400px] lg:h-[460px] bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1] xl:to-[#0758a4]" />

        {/* Bottom Right */}
        <div className="absolute top-[390px] sm:top-[755px] lg:top-[760px] right-0 lg:right-[80px] w-[60px] sm:w-[290px] 2xl:w-[400px] h-[150px] sm:h-[260px] lg:h-[440px] xl:h-[240px] 2xl:h-[400px] bg-gradient-to-tr from-[#ffbaba] to-[#fdddd1]" />

        {/* --- CONTENT SECTIONS --- */}

        {/* Lead Text */}
        <section
          className={`${robotoCondensed.className} z-[10] absolute top-0 left-[24vw] sm:left-[28vw] lg:left-[260px] w-[63vw] sm:w-[50vw] lg:w-[520px] 2xl:w-[800px] p-3 lg:p-6`}>
          <p className="font-bold tracking-tight leading-none text-xl/5 md:text-3xl/7 lg:text-4xl/9 2xl:text-6xl/15" style={{ color: props.leadColor }}>
            {props.lead}
          </p>
        </section>

        {/* Wakeup Text */}
        <section className={`${robotoCondensed.className} z-[20] absolute top-[145px] sm:top-[190px] lg:top-[225px] right-0 w-[65vw] lg:w-[645px] 2xl:w-[800px] h-[170px] sm:h-[295px] lg:h-[320px] 2xl:h-[360px] bg-gradient-to-br from-[#0758a4] to-[#002f49] text-white p-6 pl-8 md:pl-16`}>
          <p className="text-lg/5 md:text-3xl/7 lg:text-4xl/9 2xl:text-6xl/15 font-bold tracking-tight">
            {props.wakeup.intro}
            <br />
            {props.wakeup.leadup}
            <span className="text-xl md:text-4xl lg:text-5xl 2xl:text-7xl leading-none mx-1">{props.wakeup.time}</span>
            {props.wakeup.context}
          </p>
        </section>

        {/* Ready Text (Image Background) */}
        <section className={`${robotoCondensed.className} z-[30] absolute top-[180px] sm:top-[250px] lg:top-[300px] left-0 lg:left-[160px] w-[40vw] lg:w-[520px] 2xl:w-[600px] h-[215px] sm:h-[450px] lg:h-[690px] 2xl:h-[900px] text-white uppercase leading-none overflow-hidden`}>
          <Image
            src={props.images.ready}
            alt="Ready Background"
            fill
            className="object-cover -z-10"
          />
          <div className="m-4 md:m-6 font-bold">
            <span className="block text-xs md:text-2xl lg:text-4xl mb-2">{props.ready.intro}</span>
            <span className="block text-[2.8em] md:text-8xl lg:text-[10rem] font-bold leading-[0.9]">{props.ready.time}</span>
            <span className="block text-sm md:text-3xl lg:text-5xl mt-2">{props.ready.outro}</span>
          </div>
        </section>

        {/* Delivery Text */}
        <section className={`${robotoCondensed.className} z-[40] absolute top-[350px] sm:top-[545px] lg:top-[620px] 2xl:top-[800px] left-[8vw] sm:left-[25vw] lg:left-[520px] w-[60vw] sm:w-[405px] lg:w-[440px] 2xl:w-[600px] h-[135px] sm:h-[245px] lg:h-[280px] 2xl:h-[360px] bg-gradient-to-tr from-[#002f49] via-[#0758a4] to-[#ffbaba] text-white p-4 md:p-8 md:pr-24`}>
          <div className="text-lg/5 md:text-3xl/7 lg:text-4xl/9 2xl:text-5xl/13 font-bold tracking-tight">
            {props.delivery.intro}
            <span className="mx-1 text-xl/5 md:text-4xl/7 lg:text-5xl/9 2xl:text-6xl/13">{props.delivery.time}</span>
            {props.delivery.text}
          </div>
        </section>

        {/* Independent Text (Image Background) */}
        <section className={`${robotoCondensed.className} z-[30] absolute top-[425px] sm:top-[625px] lg:top-[820px] 2xl:top-[1100px] left-[75px] sm:left-[30vw] lg:left-[640px] 2xl:left-[900px] w-[285px] sm:w-[475px] lg:w-[610px] 2xl:w-[700px] h-[215px] sm:h-[450px] lg:h-[460px] 2xl:h-[600px] flex flex-col justify-end items-end p-4 text-white uppercase text-right`}>
          <Image
            src={props.images.independent}
            alt="Independent Background"
            fill
            className="object-cover z-31"
          />
          <div className="z-[32] m-4 font-bold">
            <span className="block text-normal md:text-2xl lg:text-3xl">Unabhängig und</span>
            <span className="block text-3xl md:text-5xl lg:text-5xl leading-none">kostenlos</span>
          </div>
        </section>

        {/* Subscribe Text */}
        <section className={`${robotoCondensed.className} z-[30] absolute top-[655px] sm:top-[1115px] lg:top-[1190px] 2xl:top-[1600px] left-[8vw] lg:left-[220px] 2xl:left-[15vw] w-[60vw] lg:w-[470px] 2xl:w-[25vw] h-[115px] sm:h-[240px] lg:h-[290px] 2xl:h-[15vw] bg-gradient-to-r from-[#e67964] to-[#fcb4b2] text-white p-4 md:p-8 2xl:p-16`}>
          <p className="text-base/5 md:text-3xl/7 lg:text-4xl/9 2xl:text-5xl/13 font-bold tracking-tight" dangerouslySetInnerHTML={{ __html: props.subscribeText.replace(/\n/g, '<br/>') }} />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="z-[20] relative w-full mx-auto h-[450px] sm:h-[725px] lg:h-[610px] flex items-center justify-center">
        <Image
          src={props.images.footer}
          alt="Footer Background"
          fill
          className="object-cover -z-10"
        />
        <div className="w-[90%] max-w-[600px] mt-[5vw]">
          <Suspense fallback={null}>
            <MailchimpForm formConfig={props.formConfig} />
          </Suspense>
        </div>
      </footer>
    </div>
  );
}