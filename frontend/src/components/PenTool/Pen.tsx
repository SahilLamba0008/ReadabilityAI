import { Pen, Redo2, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { PenToolCanvas } from "./Canvas";

let penTool: PenToolCanvas | null = null;

export const enablePenTool = () => {
	console.log("Enabling pen tool with message:");
	penTool = new PenToolCanvas({ color: "red" });
	penTool.enable();
};

export const disablePenTool = () => {
	penTool?.disable();
	penTool = null;
	console.log("Disabling pen tool with message:");
};

export const undoPenToolStroke = () => {
	console.log("Undoing pen tool stroke");
	penTool?.undo();
};

export const redoPenToolStroke = () => {
	console.log("Redoing pen tool stroke");
	penTool?.redo();
};

export const clearPenToolStrokes = () => {
	console.log("Clearing pen tool strokes");
	penTool?.clear();
};

export const updatePenToolColor = (color: string) => {
	if (penTool) {
		penTool.setColor(color);
		console.log("Updated pen tool color to:", color);
	} else {
		console.log("Pen tool is not enabled. Cannot update color.");
	}
};

const PenTool = () => {
	const [penEnabled, setPenEnabled] = useState(false);
	const penColors = ["red", "blue", "yellow", "green"];

	const [selectedPenColor, setSelectedPenColor] = useState(penColors[0]);

	useEffect(() => {
		browser.runtime.sendMessage({
			tool: "pen",
			action: penEnabled ? "enable" : "disable",
		});
	}, [penEnabled]);

	useEffect(() => {
		if (penEnabled) {
			browser.runtime.sendMessage({
				tool: "pen",
				action: "updateColor",
				payload: {
					color: selectedPenColor,
				},
			});
		}
	}, [selectedPenColor, penEnabled]);

	function sendUndoRedoMessage(action: "undo" | "redo") {
		console.log(`Sending ${action} message`);
		browser.runtime.sendMessage({
			tool: "pen",
			action,
		});
	}

	function sendClearMessage() {
		browser.runtime.sendMessage({
			tool: "pen",
			action: "clear",
		});
	}

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
									onClick={() => sendUndoRedoMessage("undo")}
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
									onClick={() => sendUndoRedoMessage("redo")}
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
									onClick={() => sendClearMessage()}
								>
									<Trash2 className="w-3 h-3" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Delete all strokes (Ctrl+Del)</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</div>
			)}
		</div>
	);
};

export default PenTool;
