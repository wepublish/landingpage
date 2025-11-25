import { Suspense } from "react";
import MailchimpForm from "../../../components/mailchimp-form";
import { FormConfig } from "@/types/types";
import Image, { StaticImageData } from "next/image";
import logo from "./logo_black.svg"
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"]
});

export interface BriefingLightProps {
  title: string;
  subtitle: string;
  image: StaticImageData;
  formConfig: FormConfig;
}

export default function BriefingLight(props: BriefingLightProps) {
    return (
        <main className={`${robotoCondensed.className} min-h-screen bg-[#feeae3]`}>
            <div className="px-4 mx-auto lg:w-1/3 flex flex-col items-center">
                <Image src={logo} alt="Logo Bajour" className="w-1/2 my-4" />
                <section className="grid gap-6 lg:grid-cols-2 mb-4">
                    <section>
                        <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
                        <p>{props.subtitle}</p>
                    </section>
                    <Image src={props.image} alt={"Vorschau Briefing"} className="px-24 lg:px-0" />
                </section>

                <section className="w-full">
                    <Suspense fallback={null}>
                        <MailchimpForm formConfig={props.formConfig} />
                    </Suspense>
                </section>
            </div>
        </main>
    );
}
