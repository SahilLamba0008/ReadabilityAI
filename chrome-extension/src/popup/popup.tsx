import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlighterTool from "@/components/HighlighterTool";
import PenTool from "@/components/PenTool";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Popup() {
	return (
		<div className="dark h-[500px] w-[400px] bg-background">
			<Header />
			<div className="p-4 flex flex-col gap-4">
				<Card className="bg-card border border-border p-4 rounded-xl">
					<div className="mb-4 flex flex-col gap-1">
						<div>
							<h2 className="text-sm text-card-foreground font-semibold flex items-center">
								Pen :
							</h2>
							<PenTool />
						</div>
						<div>
							<h2 className="text-sm text-card-foreground font-semibold flex items-center">
								Highlighter :
							</h2>
							<HighlighterTool />
						</div>
					</div>
				</Card>
				<Card className="bg-card border border-border p-4 rounded-xl">
					<h2 className="text-sm text-card-foreground font-semibold mb-2 flex items-center">
						AI Assistant
					</h2>
					<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring px-4 py-2 text-sm rounded-lg flex items-center gap-1 w-full justify-center">
						<Sparkles className="h-4 w-4" />
						Summarize
					</Button>
				</Card>
			</div>
			<Footer />
		</div>
	);
}
