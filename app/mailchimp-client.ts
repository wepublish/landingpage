import mailchimp from "@mailchimp/mailchimp_marketing";

const apiKey = process.env.MAILCHIMP_API_KEY!;
const server = apiKey.split("-")[1];

mailchimp.setConfig({ apiKey: apiKey, server: server });
export default mailchimp;
