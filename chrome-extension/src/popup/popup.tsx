import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { handleApiKeySave } from "@/lib/utils";

export default function Popup() {
	const [keyValue, setKeyValue] = useState<string>("");

	return (
		<div className="h-[600px] w-[400px] bg-gradient-to-b from-black to-slate-900 text-white overflow-y-auto">
			{/* Header */}
			<div className="p-4 border-b border-gray-800">
				<div className="flex items-center gap-2 justify-center">
					<Sparkles className="h-5 w-5 text-cyan-400" />
					<h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">
						Readability AI
					</h1>
				</div>
				<p className="text-xs text-gray-400 text-center mt-1">
					Transform complex content into reader-friendly summaries
				</p>
			</div>

			{/* Main Content */}
			<div className="p-4">
				<Card className="bg-slate-900/60 border border-gray-800 backdrop-blur-sm p-4 rounded-xl shadow-lg">
					{/* API Key Section */}
					<div className="mb-4 pb-4 border-b border-gray-800">
						<h2 className="text-sm font-semibold mb-2 text-cyan-400 flex items-center">
							<span className="bg-cyan-500 text-black text-xs rounded-full w-5 h-5 inline-flex items-center justify-center mr-2">
								1
							</span>
							Connect your Chat-GPT API Key
						</h2>
						<div className="flex gap-2">
							<Input
								type="password"
								placeholder="Enter your Chat-GPT API key"
								className="bg-slate-800/70 border-gray-700 focus:border-cyan-500 text-white placeholder:text-gray-500 text-sm h-8 pr-8"
								value={keyValue}
								onChange={(e) => setKeyValue(e.target.value)}
							/>
							<Button
								className="bg-cyan-600 hover:bg-cyan-700 whitespace-nowrap h-8 text-xs px-2"
								onClick={() => handleApiKeySave(keyValue)}
							>
								Save
							</Button>
						</div>
						<p className="text-gray-400 text-xs mt-2">
							Your API key is stored locally in your extension.
						</p>
					</div>

					{/* Content Input */}
					<div className="mb-4">
						<h2 className="text-sm font-semibold mb-2 text-cyan-400 flex items-center">
							<span className="bg-cyan-500 text-black text-xs rounded-full w-5 h-5 inline-flex items-center justify-center mr-2">
								2
							</span>
							Paste your content
						</h2>
						<Textarea
							placeholder="Paste your blog post or article content here..."
							className="min-h-[150px] bg-slate-800/70 border-gray-700 focus:border-cyan-500 text-white placeholder:text-gray-500 text-sm"
						/>
					</div>

					{/* Summarize Button */}
					<div className="flex justify-center mb-4">
						<Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-1 w-full justify-center">
							<Sparkles className="h-4 w-4" />
							Summarize
						</Button>
					</div>
				</Card>

				{/* Results Area (Optional - can be shown after summarization) */}
				<div className="mt-4">
					<Card className="bg-slate-900/60 border border-gray-800 backdrop-blur-sm p-4 rounded-xl shadow-lg">
						<h2 className="text-sm font-semibold mb-2 text-cyan-400">
							Summary Results
						</h2>
						<div className="bg-slate-800/70 border border-gray-700 rounded-lg p-3 text-xs text-gray-300">
							<p>Your summary will appear here after processing.</p>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
