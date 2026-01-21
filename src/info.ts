import { Mailchimp } from "@wepublish/wepublish-mailchimp";
import fs from 'fs';

async function getMailchimpInfo() {
    const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY!);
    const infoJson = await mailchimp.getInfoJson();
    fs.writeFileSync('info.json', JSON.stringify(infoJson, null, 2));

    console.log(await mailchimp.getInfoString());
}

getMailchimpInfo();
