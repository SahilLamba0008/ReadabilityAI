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
			matches: ["https://medium.com/*/*"],
			js: ["src/content/content.ts"],
			run_at: "document_idle",
		},
	],
	background: {
		service_worker: "src/background/background.ts",
	},
	host_permissions: ["http://*/*", "https://*/*"],
}));
