import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Popup from "./popup/popup.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Popup />
	</StrictMode>
);
