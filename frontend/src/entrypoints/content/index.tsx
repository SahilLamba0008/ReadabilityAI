import "~/assets/global.css";

export default defineContentScript({
	matches: ["https://medium.com/*/*", "https://leetcode.com/*/*/"],
	cssInjectionMode: "ui",

	async main(ctx) {
		const ui = await createIframeUi(ctx, {
			page: "/sidepanel.html",
			position: "inline",
			anchor: "body",
			onMount: (wrapper, iframe) => {
				iframe.width = "320px";
				iframe.height = "100%";
				iframe.style.border = "none";
				iframe.style.zIndex = "9999";
				iframe.style.position = "fixed";
				iframe.style.top = "0";
				iframe.style.right = "0";
				iframe.style.backgroundColor = "white";
				iframe.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
			},
		});

		ui.mount();
	},
});
