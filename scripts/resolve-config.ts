import { Mailchimp } from "@wepublish/wepublish-mailchimp";
import fs from "fs";
import path from "path";

const TENANTS = ["BAJOUR", "GANZGRAZ"];

async function resolveConfig() {
  const config: Record<string, unknown> = {};

  for (const tenant of TENANTS) {
    const apiKey = process.env[`MAILCHIMP_API_KEY_${tenant}`];
    if (!apiKey) {
      console.error(`Missing env var MAILCHIMP_API_KEY_${tenant}`);
      process.exit(1);
    }

    console.log(`Fetching Mailchimp info for ${tenant}...`);
    const mailchimp = new Mailchimp(apiKey);
    const info = await mailchimp.getInfoJson();
    config[tenant] = info;
  }

  const outputPath = path.join(process.cwd(), "lib", "mailchimp-config.json");
  fs.writeFileSync(outputPath, JSON.stringify(config, null, 2));
  console.log(`Config written to ${outputPath}`);
  console.log(
    `Tenants resolved: ${Object.keys(config).join(", ") || "(none)"}`
  );
}

resolveConfig().catch((err) => {
  console.error("Failed to resolve config:", err);
  process.exit(1);
});