import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Sparkles, ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const SummarizeButton = () => {
	const mockSummaryPoints = [
		"The article discusses the fundamentals of artificial intelligence and machine learning",
		"Key concepts include neural networks, deep learning, and data processing techniques",
		"Practical applications in various industries are highlighted with real-world examples",
		"Future trends and developments in AI technology are explored in detail",
	];
	const [isSummaryOpen, setIsSummaryOpen] = React.useState(false);

	return (
		<div>
			{/* AI Summarize Section */}
			<Collapsible open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
				<div className="space-y-2">
					<div className="flex">
						<Button className="h-10 flex-1 rounded-r-none bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900">
							<Sparkles className="w-4 h-4 mr-2" />
							Summarize Page
						</Button>
						<CollapsibleTrigger asChild>
							<Button
								variant="outline"
								className="px-3 rounded-l-none border-l-0 h-10 bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 border-slate-600 text-white"
							>
								<ChevronDown
									className={`w-4 h-4 transition-transform text-white ${
										isSummaryOpen ? "rotate-180" : ""
									}`}
								/>
							</Button>
						</CollapsibleTrigger>
					</div>

					<CollapsibleContent className="space-y-2">
						<Card className="p-4 bg-card border-border">
							<h4 className="font-medium text-sm mb-3 text-foreground">
								Page Summary
							</h4>
							<div className="space-y-2">
								{mockSummaryPoints.map((point, index) => (
									<div key={index} className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-slate-600" />
										<p className="text-sm leading-relaxed text-muted-foreground">
											{point}
										</p>
									</div>
								))}
							</div>
						</Card>
					</CollapsibleContent>
				</div>
			</Collapsible>
		</div>
	);
};

export default SummarizeButton;
