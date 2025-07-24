import "~/assets/tailwind.css";
import ReactDOM from "react-dom/client";
import { DropdownDemo } from "../components/DropdownDemo";

export default defineContentScript({
	matches: ["<all_urls>"],

	main(ctx) {
		const ui = createIntegratedUi(ctx, {
			position: "inline",
			anchor: "body",
			onMount: (container) => {
				// Create a root on the UI container and render a component
				const root = ReactDOM.createRoot(container);
				container.id = "side-panel-extension";
				container.style.position = "fixed";
				container.style.top = "0";
				container.style.right = "0";
				container.style.width = "400px";
				container.style.height = "100%";
				container.style.backgroundColor = "#fff";
				container.style.zIndex = "9999";
				container.style.boxShadow = "-2px 0 5px rgba(0,0,0,0.1)";
				container.style.overflow = "auto";
				document.body.append(container);
				root.render(<DropdownDemo />);
				return root;
			},
			onRemove: (root) => {
				// Unmount the root when the UI is removed
				root?.unmount();
			},
		});

		// Call mount to add the UI to the DOM
		ui.mount();
	},
});
