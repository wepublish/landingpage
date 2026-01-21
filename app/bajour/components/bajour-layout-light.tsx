import { Suspense } from "react";
import MailchimpForm from "../../../components/mailchimp-form";
import { FormConfig } from "@/types/types";
import Image, { StaticImageData } from "next/image";
import logo from "./logo_black.svg"
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"]
});

interface BajourLayoutLightProps {
  title: string;
  subtitle: string;
  image: StaticImageData;
  formConfig: FormConfig;
}

export default function BajourLayoutLight(props: BajourLayoutLightProps) {
    return (
        <main className={`${robotoCondensed.className} min-h-screen bg-[#feeae3]`}>
            <div className="px-4 mx-auto lg:w-1/2 flex flex-col items-center">
                <Image src={logo} alt="Logo Bajour" className="w-1/2 my-4" />
                <section className="grid gap-6 lg:grid-cols-3 mb-4">
                    <section className="lg:col-span-2">
                        <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
                        <p className="mb-3">{props.subtitle}</p>

                        <Suspense fallback={null}>
                            <MailchimpForm formConfig={props.formConfig} />
                        </Suspense>
                    </section>
                    <Image src={props.image} alt={"Vorschau Briefing"} className="px-24 lg:px-0" />
                </section>
            </div>
        </main>
    );
}
