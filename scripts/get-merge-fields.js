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

const { getMergeFields } = require("../services/mailchimp.service.ts");

(async () => {
  try {
    const listId = process.argv[2] || "851436c80e";
    const mergeFields = await getMergeFields(listId);

    console.log(`✅ Merge-Felder für Liste ${listId}:`);
    mergeFields.forEach((field) => {
      const requirement = field.required ? "required" : "optional";
      console.log(
        `- ${field.tag} (${field.name}) – ${field.type} [${requirement}]`
      );
    });
  } catch (err) {
    console.error("❌ Fehler beim Abrufen der Merge Felder:", err);
    process.exit(1);
  }
})();
