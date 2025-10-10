import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { PaintRoller, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const SyncButtons = () => {
	const penToolStrokes = useSelector((state: any) => state.pen.penStrokes);
	const paintHistoryStrokes = () => {
		browser.runtime.sendMessage({
			tool: "pen",
			action: "repaintHistoryStrokes",
			payload: penToolStrokes,
		});
	};

	function updateSupabaseHighlights() {}
	function updateSupabasePenStrokes() {}
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<Button variant="outline" className="w-full bg-transparent">
					<PaintRoller className="w-4 h-4 mr-2" />
					Repaint Highlights
				</Button>
				<Tooltip delayDuration={400}>
					<TooltipTrigger>
						<Button variant="outline" onClick={updateSupabaseHighlights}>
							<RefreshCw className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Sync Highlights</p>
					</TooltipContent>
				</Tooltip>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					className="w-full bg-transparent"
					onClick={() => {
						paintHistoryStrokes();
					}}
				>
					<PaintRoller className="w-4 h-4 mr-2" />
					Repaint Strokes
				</Button>
				<Tooltip delayDuration={400}>
					<TooltipTrigger>
						<Button variant="outline" onClick={updateSupabasePenStrokes}>
							<RefreshCw className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<p>Sync Strokes</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
};

export default SyncButtons;
