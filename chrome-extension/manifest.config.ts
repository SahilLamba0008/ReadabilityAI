import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest(() => ({
  manifest_version: 3,
  name: "Readability Summarizer",
  version: "1.0",
  permissions: ["scripting", "activeTab", "tabs"],
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      matches: ["https://medium.com/blog/how-to-find-a-publication-on-medium-59527f6b7a77"],
      js: ["src/contentScript/contentScript.js"],
      run_at: "document_idle",
    },
  ],
  background: {
    service_worker: "src/background/background.js",
  },
  host_permissions: ["https://medium.com/blog/how-to-find-a-publication-on-medium-59527f6b7a77"],
}));
