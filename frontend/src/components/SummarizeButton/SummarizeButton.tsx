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
import useMutation from "@/hooks/useMutation";
import MarkdownRenderer from "../ui/reactMarkdown";

type SummarizeResponse = {
	summarizedContent: string;
	// add other properties if needed
};

const SummarizeButton = () => {
	const [isSummaryOpen, setIsSummaryOpen] = React.useState(false);
	// const { data, loading, error, fetchData } = useFetch(
	// 	"http://localhost:8080/api/summarize"
	// );
	const { data, loading, error, mutate } = useMutation({
		method: "POST",
		route: "/summarize",
	});

	return (
		<div>
			{/* AI Summarize Section */}
			<Collapsible open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
				<div className="space-y-2">
					<div className="flex">
						<Button
							className="h-10 flex-1 rounded-r-none bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900"
							onClick={async () => {
								console.log("Summarize button clicked");
								browser.runtime.sendMessage({ action: "get_url" });
								browser.runtime.onMessage.addListener(
									(message: { action: string; payload: { url: string } }) => {
										if (message.action === "url_fetched") {
											console.log(
												"URL fetched in side panel:",
												message.payload.url
											);
											mutate({ url: message.payload.url });
										}
									}
								);
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
										{data ? (
											<MarkdownRenderer content={data.summarizedContent} />
										) : (
											"Click on Summarize Page button to get the page summary."
										)}
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
