// scripts/get-group.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    module: "CommonJS",
    moduleResolution: "Node",
  },
});
require("tsconfig-paths/register");

const { getGroupIds } = require("../services/mailchimp.service.ts");

(async () => {
  try {
    const listId = "851436c80e";
    const result = await getGroupIds(listId);
    console.log("✅ Gruppen erfolgreich geladen:");
    console.log(result);
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Gruppen:", err);
    process.exit(1);
  }
})();
