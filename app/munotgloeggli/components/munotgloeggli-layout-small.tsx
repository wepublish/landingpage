import { Suspense } from "react";
import MailchimpForm from "../../../components/mailchimp-form";
import { FormConfig } from "@/types/types";
import Image, { StaticImageData } from "next/image";
import { Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";
import teamfoto from "../assets/team.jpg";
import MetaPixel from "@/components/meta-pixel";
import Link from "next/link";

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"]
});

const ttNorms = localFont({
    src: "../assets/tt_norms_regular.otf",
});

const ttNormsBold = localFont({
    src: "../assets/tt_norms_bold.otf",
    weight: "700",
    style: "normal",
});

interface Testimonial {
  quote: string;
  author: string;
}

interface MunotgloeggliLayoutSmallProps {
  logo: StaticImageData;
  title: string;
  subtitle: string;
  text: string;
  image: StaticImageData;
  formConfig: FormConfig;
  listItems: string[];
  testimonials: Testimonial[];
  subscriberCountBold: string;
  subscriberCountText: string;
}

export default function MunotgloeggliLayoutSmall(props: MunotgloeggliLayoutSmallProps) {
    return (
        <>
            <title>{props.title}</title>
            <MetaPixel pixelId="1259793032931410" />
            <main className={`${robotoCondensed.className} min-h-screen bg-white`}>
            <div className="px-4 mx-auto lg:w-1/3 flex flex-col items-center">
                <Link href="https://munotgloeggli.ch" target="_blank" rel="noopener noreferrer" className="flex justify-center w-full">
                    <Image src={props.logo} alt="Logo" className="w-100 mt-4" />
                </Link>
                <section className="mb-4">
                    <section>
                        <h2 className={`text-xl text-center mt-2 mb-10 text-gray-950/80 ${ttNormsBold.className}`}>{props.subtitle}</h2>
                        <p className={ttNorms.className} dangerouslySetInnerHTML={{ __html: props.text }} />
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
                            <ul className={`list-disc list-inside text-gray-800 space-y-1 pl-4 text-lg md:text-base ${ttNorms.className}`}>
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
                    <Image src={teamfoto} alt="Das munotgloeggli-Team" className="w-full h-auto rounded-md" />
                    <p className={`mt-2 text-center font-bold ${ttNorms.className}`}>Dein Munotglöggli-Team</p>
                </section>

                <section className="w-full mt-4">
                    <div className="mt-6 text-center text-xs text-gray-500">
                        <a href="https://munotgloeggli.ch/impressum" target="_blank" rel="noopener noreferrer" className="hover:underline">Impressum</a>
                        <span className="mx-2">|</span>
                        <a href="https://munotgloeggli.ch" target="_blank" rel="noopener noreferrer" className="hover:underline">über Munotglöggli</a>
                    </div>
                </section>

            </div>
            </main>
        </>
    );
}
