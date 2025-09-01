import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Sparkles, ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Spinner } from "../ui/shadcn-io/spinner";

const SummarizeButton = () => {
	const mockSummaryPoints = [
		"The article discusses the fundamentals of artificial intelligence and machine learning",
		"Key concepts include neural networks, deep learning, and data processing techniques",
		"Practical applications in various industries are highlighted with real-world examples",
		"Future trends and developments in AI technology are explored in detail",
	];
	const [isSummaryOpen, setIsSummaryOpen] = React.useState(false);
	const { data, loading, error, fetchData } = useFetch(
		"https://dummyjson.com/todos"
	);

	return (
		<div>
			{/* AI Summarize Section */}
			<Collapsible open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
				<div className="space-y-2">
					<div className="flex">
						<Button
							className="h-10 flex-1 rounded-r-none bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900"
							onClick={() => {
								fetchData();
								setIsSummaryOpen(true);
							}}
						>
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
						<Card
							className={`p-4 bg-card border-border ${
								data ? "gap-5" : "gap-2"
							}`}
						>
							{loading ? (
								<div className="flex flex-col gap-2 items-center">
									<Spinner variant="bars" />
									Loading Summary...
								</div>
							) : error ? (
								<>
									<h4 className="font-medium text-sm mb-1 text-red-500">
										Failed to Load Summary
									</h4>
									<p className="text-muted-foreground">{error}</p>
								</>
							) : (
								<>
									<h4 className="font-medium text-sm mb-1 text-foreground">
										{data ? "Page Summary" : "No Summary Available"}
									</h4>
									<div className="space-y-2">
										{data
											? data.todos
													?.slice(0, 3)
													.map((todo: any, index: number) => (
														<div key={index} className="flex items-start gap-2">
															<div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-slate-600" />
															<p className="text-sm leading-relaxed text-muted-foreground">
																{todo.todo} {todo.completed ? "✅" : "⏳"}
															</p>
														</div>
													))
											: "Click on Summarize Page button to get the page summary."}
									</div>
								</>
							)}
						</Card>
					</CollapsibleContent>
				</div>
			</Collapsible>
		</div>
	);
};

export default SummarizeButton;
