import { Mailchimp } from "../lib/mailchimp-client";
import fs from 'fs';

const tenant = process.argv[2]?.toUpperCase();
if (!tenant) {
    console.error("Usage: npx tsx src/info.ts <TENANT>  (e.g. BAJOUR, TSRI)");
    process.exit(1);
}

const apiKey = process.env[`MAILCHIMP_API_KEY_${tenant}`];
if (!apiKey) {
    console.error(`Missing env var MAILCHIMP_API_KEY_${tenant}`);
    process.exit(1);
}

async function getMailchimpInfo() {
    const mailchimp = new Mailchimp(apiKey!);
    const infoJson = await mailchimp.getInfoJson();
    fs.writeFileSync('info.json', JSON.stringify(infoJson, null, 2));
    console.log(JSON.stringify(infoJson, null, 2));
}

getMailchimpInfo();
