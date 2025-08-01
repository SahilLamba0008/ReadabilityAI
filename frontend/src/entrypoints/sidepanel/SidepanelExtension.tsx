import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlighterTool from "@/components/HighlighterTool";
import Highlights from "@/components/Highlights";
import PenTool from "@/components/PenTool";
import SummarizeButton from "@/components/SummarizeButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { RefreshCw } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom/client";
import "~/assets/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div className="h-screen w-full flex flex-col justify-between">
			<Header />
			{/* Main Content */}
			<div className="flex-1 overflow-y-auto custom-scrollbar">
				<div className="p-4 space-y-4">
					<div className="text-center">
						<h1
							className={
								"text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900"
							}
						>
							Readability AI
						</h1>
						<p className={"text-xs mt-1 text-muted-foreground"}>
							Highlight, annotate, and summarize web content
						</p>
					</div>

					{/* Tools Section */}
					<TooltipProvider>
						<Card className={"p-4 space-y-4 bg-card border-border"}>
							<h3 className={"font-medium text-sm text-foreground"}>Tools</h3>
							<PenTool />
							{/* <Separator /> */}
							<HighlighterTool />
						</Card>
					</TooltipProvider>

					{/* Actions Section */}
					<SummarizeButton />

					{/* Repaint Buttons */}
					<div className="space-y-2">
						<Button variant="outline" className={"w-full bg-transparent"}>
							<RefreshCw className="w-4 h-4 mr-2" />
							Repaint Highlights
						</Button>
						<Button variant="outline" className={"w-full bg-transparent"}>
							<RefreshCw className="w-4 h-4 mr-2" />
							Repaint Strokes
						</Button>
					</div>

					{/* Highlighted content card */}
					<Highlights />
				</div>
			</div>
			<Footer />
		</div>
	</React.StrictMode>
);
