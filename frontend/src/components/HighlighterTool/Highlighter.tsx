import { Highlighter, Redo2, Trash2, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "@/components/ui/switch";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { HighlighterToolService } from "./HighlighterTool";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTool } from "@/store/slices/toolSlice";
import { updateColor } from "@/store/slices/highlighterSlice";
import { highlighterColors } from "@/lib/utils";

let highlighterTool: HighlighterToolService = new HighlighterToolService();

export const enableHighlighterTool = () => {
	highlighterTool?.enable();
};

export const disableHighlighterTool = () => {
	highlighterTool?.disable();
};

export const UpdateHighlighterToolColor = (color: string) => {
	if (highlighterTool) {
		highlighterTool.setColor(color);
	}
};

export const UndoHighlighterToolStroke = () => {
	highlighterTool?.undo();
};
export const RedoHighlighterToolStroke = () => {
	highlighterTool?.redo();
};

export const ClearHighlighterToolStrokes = () => {
	highlighterTool?.clearAll();
	highlighterTool = new HighlighterToolService();
};

const HighlighterTool = () => {
	const dispatch = useDispatch();
	const activeTool = useSelector((state: any) => state.tool.activeTool);
	const highlighterEnabled = activeTool === "highlighter";

	const selectedHighlighterColor = useSelector(
		(state: any) => state.highlighter.color
	);

	useEffect(() => {
		browser.runtime.sendMessage({
			tool: "highlighter",
			action: highlighterEnabled ? "enable" : "disable",
		});
	}, [highlighterEnabled]);

	useEffect(() => {
		if (highlighterEnabled) {
			browser.runtime.sendMessage({
				tool: "highlighter",
				action: "updateColor",
				payload: {
					color: selectedHighlighterColor,
				},
			});
		}
	}, [selectedHighlighterColor, highlighterEnabled]);

	function sendUndoRedoMessage(action: "undo" | "redo") {
		console.log(`Sending ${action} message`);
		browser.runtime.sendMessage({
			tool: "highlighter",
			action,
		});
	}

	function sendClearMessage() {
		browser.runtime.sendMessage({
			tool: "highlighter",
			action: "clear",
		});
	}

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Highlighter className={"w-4 h-4 text-foreground"} />
					<span className={"text-sm text-foreground"}>Highlighter Tool</span>
				</div>
				<Switch
					checked={highlighterEnabled}
					onCheckedChange={(checked) => {
						if (checked) {
							dispatch(setActiveTool("highlighter"));
						} else {
							dispatch(setActiveTool(null));
						}
					}}
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
								onClick={() => dispatch(updateColor(color))}
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
							<TooltipContent>
								<p>Undo</p>
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
								<p>Redo</p>
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
