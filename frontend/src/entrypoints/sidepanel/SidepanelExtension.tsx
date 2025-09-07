import React, { use, useState } from "react";
import ReactDOM from "react-dom/client";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PenTool from "@/components/PenTool";
import HighlighterTool from "@/components/HighlighterTool";
import Highlights from "@/components/Highlights";
import SummarizeButton from "@/components/SummarizeButton";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { RefreshCw } from "lucide-react";
import "~/assets/global.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistorStore, store } from "@/store/store";
import { togglePanel } from "@/store/slices/sidePanelSlice";
import { PersistGate } from "redux-persist/integration/react";

function SidePanelApp() {
	const dispatch = useDispatch();
	const isOpen = useSelector((state: any) => state.sidePanel.isOpen);

	const handleClick = () => {
		dispatch(togglePanel());
	};

	useEffect(() => {
		browser.runtime.sendMessage({
			action: "toggleSidepanel",
			payload: { isOpen: isOpen },
		});
	}, [isOpen]);

	return (
		<div className="h-screen w-full flex items-center">
			<Button
				className={`h-full w-fit text-primary rounded-none bg-white/50 hover:bg-black/30  transition-all ease-in-out duration-100`}
				id="close-button"
				variant="ghost"
				size="icon"
				onClick={handleClick}
			>
				<ChevronsRight
					className={`transition-transform duration-300 ${
						isOpen ? "rotate-0" : "rotate-180"
					}`}
				/>
			</Button>

			<div className="h-full w-[calc(100%-5px)] flex flex-col justify-between ml-auto border-border border-l-1">
				<Header />

				<div className="flex-1 overflow-y-auto custom-scrollbar">
					<div className="p-4 space-y-4">
						{/* your content */}
						<TooltipProvider>
							<Card className="p-4 space-y-4 bg-card border-border">
								<h3 className="font-medium text-sm text-foreground">Tools</h3>
								<PenTool />
								<HighlighterTool />
							</Card>
						</TooltipProvider>

						<SummarizeButton />

						<div className="space-y-2">
							<Button variant="outline" className="w-full bg-transparent">
								<RefreshCw className="w-4 h-4 mr-2" />
								Repaint Highlights
							</Button>
							<Button variant="outline" className="w-full bg-transparent">
								<RefreshCw className="w-4 h-4 mr-2" />
								Repaint Strokes
							</Button>
						</div>

						<Highlights />
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistorStore}>
				<SidePanelApp />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
