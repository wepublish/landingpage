import { Suspense } from "react";
import MailchimpForm from "../../../components/mailchimp-form";
import { FormConfig } from "@/types/types";
import Image, { StaticImageData } from "next/image";
import logo from "./logo_black.svg"
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"]
});

interface BriefingSuperlightProps {
  title: string;
  subtitle: string;
  image: StaticImageData;
  formConfig: FormConfig;
}

export default function BriefingSuperlight(props: BriefingSuperlightProps) {
    return (
        <main className={`${robotoCondensed.className} min-h-screen bg-[#feeae3]`}>
            <div className="px-4 mx-auto lg:w-1/3 flex flex-col items-center">
                <Image src={logo} alt="Logo Bajour" className="w-1/2 my-4" />
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
                        <p className="mt-2 text-lg md:text-xl text-gray-900"><span className="font-bold">14'907</span> Basler*innen lesen schon mit.</p>
                    </div>
                </section>

                <section className="w-full mt-6">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                            <ul className="list-disc list-inside text-gray-800 space-y-1 pl-4 text-lg md:text-base">
                                <li>Basel-News des Tages</li>
                                <li>unabhängig und kostenlos</li>
                                <li>Eventtipps</li>
                                <li>Pünktlich um 6 Uhr</li>
                                <li>Für Basel-Liebhaber</li>
                            </ul>
                        </div>

                        <div className="w-32 sm:w-24 md:w-24 lg:w-36 flex-shrink-0">
                            <Image src={props.image} alt={"Vorschau Briefing"} className="w-full h-auto object-contain rounded-md" />
                        </div>
                    </div>
                </section>

                <section className="w-full mt-6">
                    <div className="space-y-4">
                        <div className="bg-white/60 p-4 rounded-md">
                            <p className="italic text-gray-800">«Das Basel Briefing ist kurz und prägnant. Sozusagen das Wichtigste in Kürze. Perfekt für die kurze Zugfahrt zur Arbeit!!»</p>
                            <p className="mt-2 text-sm font-semibold text-gray-700">Simone (Gundeli)</p>
                        </div>

                        <div className="bg-white/60 p-4 rounded-md">
                            <p className="italic text-gray-800">«Ich freue mich jeden Morgen aufs Briefing und bin jedesmal gespannt, was es aus der Region zu berichten gibt.»</p>
                            <p className="mt-2 text-sm font-semibold text-gray-700">Dorian (Binningen)</p>
                        </div>

                        <div className="bg-white/60 p-4 rounded-md">
                            <p className="italic text-gray-800">«Das Basel Briefing gibt mir die Möglichkeit, mitreden zu können und repräsentiert viele Perspektiven. Die Veranstaltungstipps und aktuellen Diskurse sind super, makes me feel part of Basel.»</p>
                            <p className="mt-2 text-sm font-semibold text-gray-700">Lara (St. Johann)</p>
                        </div>
                    </div>
                </section>

                <section className="w-full mt-4">
                    <div className="mt-6 text-center text-xs text-gray-500">
                        <a href="https://bajour.ch/impressum" target="_blank" rel="noopener noreferrer" className="hover:underline">Impressum</a>
                        <span className="mx-2">|</span>
                        <a href="https://bajour.ch/about" target="_blank" rel="noopener noreferrer" className="hover:underline">über Bajour</a>
                    </div>
                </section>

            </div>
        </main>
    );
}
