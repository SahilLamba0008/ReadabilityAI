import HighlighterTool from "@/components/HighlighterTool/highlighter";
import PenTool from "@/components/PenTool/pen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Popup() {
	return (
		<div className="h-[500px] w-[400px] bg-gradient-to-b from-black to-slate-900 text-white overflow-y-auto">
			{/* Header */}
			<div className="p-4 border-b border-gray-800">
				<div className="flex items-center gap-2 justify-center">
					<Sparkles className="h-5 w-5 text-cyan-400" />
					<h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">
						Readability AI
					</h1>
				</div>
				<p className="text-xs text-gray-400 text-center mt-1">
					Transform complex content into quick reader-friendly bullet points
				</p>
			</div>
			<div className="p-4 flex flex-col gap-4">
				<Card className="bg-slate-900/60 border border-gray-800 backdrop-blur-sm p-4 rounded-xl shadow-lg">
					<div className="mb-4">
						<PenTool />
						<HighlighterTool />
					</div>
				</Card>
				<Card className="bg-slate-900/60 border border-gray-800 backdrop-blur-sm p-4 rounded-xl shadow-lg">
					<h2 className="text-sm font-semibold mb-2 text-cyan-400 flex items-center">
						AI Assistant
					</h2>
					<Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-4 py-2 text-sm rounded-lg flex items-center gap-1 w-full justify-center cursor-pointer">
						<Sparkles className="h-4 w-4" />
						Summarize
					</Button>
				</Card>
			</div>
		</div>
	);
}
