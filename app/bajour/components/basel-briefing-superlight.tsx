import { Suspense } from "react";
import MailchimpForm from "../../../components/mailchimp-form";
import { FormConfig } from "@/types/types";
import Image, { StaticImageData } from "next/image";
import logo from "./logo_black.svg"

export interface BaselBriefingSuperlightProps extends FormConfig {
  title: string;
  subtitle: string;
  image: StaticImageData;
}

export default function BaselBriefingSuperlight(props: BaselBriefingSuperlightProps) {
    return (
        <main className="container mx-auto p-4">
            <Image src={logo} alt="Logo Bajour" className="w-1/3 mx-auto mb-4" />
            <section className="grid gap-6 lg:grid-cols-2 mb-4">
                <section className="lg:col-span-2">
                    <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
                    <p>{props.subtitle}</p>
                </section>
            </section>

            <Suspense fallback={null}>
                <MailchimpForm
                    listId={props.listId}
                    interests={props.interests}
                    mailChimpProps={props.mailChimpProps}
                    steps={props.steps}
                    successUrl={props.successUrl}
                />
            </Suspense>

            <Image src={props.image} alt={"Vorschau Briefing"} className="px-24 mt-4" />
        </main>
    );
}
