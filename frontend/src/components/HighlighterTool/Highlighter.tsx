import { Highlighter, Redo2, Trash2, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "@/components/ui/switch";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";

const HighlighterTool = () => {
	const [highlighterEnabled, setHighlighterEnabled] = useState(false);
	const [selectedHighlighterColor, setSelectedHighlighterColor] =
		useState("#FEF3C7");
	const highlighterColors = [
		"#FEF3C7", // Light Yellow - better for reading
		"#D1FAE5", // Light Green - easier on eyes
		"#DBEAFE", // Light Blue - good contrast
		"#FCE7F3", // Light Pink - accessible
	];

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Highlighter className={"w-4 h-4 text-foreground"} />
					<span className={"text-sm text-foreground"}>Highlighter Tool</span>
				</div>
				<Switch
					checked={highlighterEnabled}
					onCheckedChange={setHighlighterEnabled}
				/>
			</div>

			{highlighterEnabled && (
				<div className="flex items-center justify-between">
					{/* Left side - Color options */}
					<div className="flex items-center gap-2">
						{highlighterColors.map((color) => (
							<button
								key={color}
								className={`w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform ${
									selectedHighlighterColor === color
										? "border-gray-600"
										: "border-gray-300"
								}`}
								style={{ backgroundColor: color }}
								onClick={() => setSelectedHighlighterColor(color)}
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
							<TooltipContent>
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

export default HighlighterTool;
