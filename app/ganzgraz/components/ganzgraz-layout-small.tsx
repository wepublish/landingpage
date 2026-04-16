import { Suspense } from "react";
import MailchimpForm from "../../../components/mailchimp-form";
import { FormConfig } from "@/types/types";
import Image, { StaticImageData } from "next/image";
import { Roboto_Condensed } from "next/font/google";
import teamfoto from "../assets/teamfoto.jpg";
import MetaPixel from "@/components/meta-pixel";
import TikTokPixel from "@/components/tiktok-pixel";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"]
});

interface Testimonial {
  quote: string;
  author: string;
}

interface GanzgrazLayoutSmallProps {
  logo: string;
  title: string;
  subtitle: string;
  image: StaticImageData;
  formConfig: FormConfig;
  listItems: string[];
  testimonials: Testimonial[];
  subscriberCountBold: string;
  subscriberCountText: string;
}

export default function GanzgrazLayoutSmall(props: GanzgrazLayoutSmallProps) {
    return (
        <>
            <title>{props.title}</title>
            <MetaPixel pixelId="2225762180979586" />
            <TikTokPixel token="D650C03C77U5GADIKCUG" />
            <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
            <GoogleTagManager gtmId="GTM-MQDHF8V" />
            <main className={`${robotoCondensed.className} min-h-screen bg-[#f8c99d]`}>
            <div className="px-4 mx-auto lg:w-1/3 flex flex-col items-center">
                <Image src={props.logo} alt="Logo" className="w-1/2 my-4" />
                <section className="mb-4">
                    <section>
                        <h1 className="text-2xl font-bold mb-4 text-center uppercase">{props.title}</h1>
                        <p>{props.subtitle}</p>
                    </section>
                </section>

                <section className="w-full">
                    <Suspense fallback={null}>
                        <MailchimpForm formConfig={props.formConfig} />
                    </Suspense>
                    <div className="mt-3 text-center">
                        <p className="text-xs text-gray-600">Abmeldung jederzeit möglich!</p>
                    </div>
                </section>

                <section className="w-full mt-6">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                            <ul className="list-disc list-inside text-gray-800 space-y-1 pl-4 text-lg md:text-base">
                                {props.listItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-32 sm:w-24 md:w-24 lg:w-36 flex-shrink-0">
                            <Image src={props.image} alt={"Vorschau Briefing"} className="w-full h-auto object-contain rounded-md" />
                        </div>
                    </div>
                </section>

                <section className="w-full mt-6">
                    <Image src={teamfoto} alt="Das GanzGraz-Team" className="w-full h-auto rounded-md" />
                    <p className="mt-2 text-center font-bold">Dein ganzgraz-Team!</p>
                    <p className="text-center text-xs text-gray-500">Credits: Karin Daninger</p>
                </section>

                <section className="w-full mt-4">
                    <div className="mt-6 text-center text-xs text-gray-500">
                        <a href="https://ganzgraz.at/impressum" target="_blank" rel="noopener noreferrer" className="hover:underline">Impressum</a>
                        <span className="mx-2">|</span>
                        <a href="https://ganzgraz.at" target="_blank" rel="noopener noreferrer" className="hover:underline">über GanzGraz</a>
                    </div>
                </section>

            </div>
            </main>
        </>
    );
}
