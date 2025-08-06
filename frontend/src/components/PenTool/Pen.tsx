import { Pen, Redo2, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

const PenTool = () => {
	const [penEnabled, setPenEnabled] = useState(false);
	const penColors = [
		"#F3F4F6", // Light Gray - polite alternative to black
		"#FEF7CD", // Very Light Yellow - polite alternative to white
		"#FEE2E2", // Light Red - polite alternative to red
		"#DBEAFE", // Light Blue - same as highlighter for consistency
	];

	const [selectedPenColor, setSelectedPenColor] = useState("#F3F4F6");

	useEffect(() => {
		browser.runtime.sendMessage({
			type: penEnabled ? "penToolEnabled" : "penToolDisabled",
		});
	}, [penEnabled, selectedPenColor]);

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Pen className={"w-4 h-4 text-foreground"} />
					<span className={"text-sm text-foreground"}>Pen Tool</span>
				</div>
				<Switch checked={penEnabled} onCheckedChange={setPenEnabled} />
			</div>

			{penEnabled && (
				<div className="flex items-center justify-between">
					{/* Left side - Color options */}
					<div className="flex items-center gap-2">
						{penColors.map((color) => (
							<button
								key={color}
								className={`w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform ${
									selectedPenColor === color
										? "border-gray-600"
										: "border-gray-300"
								}`}
								style={{ backgroundColor: color }}
								onClick={() => setSelectedPenColor(color)}
							/>
						))}
					</div>

					{/* Right side - Action buttons */}
					<div className="flex items-center gap-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className={"w-8 h-8 p-0 bg-transparent"}
								>
									<Undo2 className="w-3 h-3" />
								</Button>
							</TooltipTrigger>
							<TooltipContent className={"text-gray-100"}>
								<p>Undo (Ctrl+Z)</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className={"w-8 h-8 p-0 bg-transparent"}
								>
									<Redo2 className="w-3 h-3" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Redo (Ctrl+Y)</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className={"w-8 h-8 p-0 bg-transparent"}
								>
									<Trash2 className="w-3 h-3" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Delete all highlights and strokes</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</div>
			)}
		</div>
	);
};

export default PenTool;
