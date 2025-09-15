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

export const enableHighlighterTool = (
	highlighterTool: HighlighterToolService | null
) => {
	console.log("Enabling highlighter tool with message:", highlighterTool);
	highlighterTool?.enable();
};

export const disableHighlighterTool = (
	highlighterTool: HighlighterToolService | null
) => {
	highlighterTool?.disable();
	console.log("Disabling highlighter tool with message:");
};

export const UpdateHighlighterToolColor = (
	color: string,
	highlighterTool: HighlighterToolService | null
) => {
	if (highlighterTool) {
		highlighterTool.setColor(color);
	}
	console.log("Updated highlighter tool color to:", color);
};

export const UndoHighlighterToolStroke = (
	highlighterTool: HighlighterToolService | null
) => {
	console.log("Undoing highlighter tool stroke");
	highlighterTool?.undo();
};
export const RedoHighlighterToolStroke = (
	highlighterTool: HighlighterToolService | null
) => {
	console.log("Redoing highlighter tool stroke");
	highlighterTool?.redo();
};

export const ClearHighlighterToolStrokes = (
	highlighterTool: HighlighterToolService | null
) => {
	console.log("Clearing highlighter tool strokes");
	highlighterTool?.clearAll();
	highlighterTool = new HighlighterToolService();
};

const HighlighterTool = () => {
	const highlighterTool: HighlighterToolService | null =
		new HighlighterToolService();
	const dispatch = useDispatch();

	useEffect(() => {
		highlighterTool?.setDispatch(dispatch);
	}, [dispatch]);

	const activeTool = useSelector((state: any) => state.tool.activeTool);
	const highlighterEnabled = activeTool === "highlighter";

	const selectedHighlighterColor = useSelector(
		(state: any) => state.highlighter.color
	);

	useEffect(() => {
		browser.runtime.sendMessage({
			tool: "highlighter",
			action: highlighterEnabled ? "enable" : "disable",
			payload: {
				toolObj: highlighterTool,
			},
		});
	}, [highlighterEnabled]);

	useEffect(() => {
		if (highlighterEnabled) {
			browser.runtime.sendMessage({
				tool: "highlighter",
				action: "updateColor",
				payload: {
					color: selectedHighlighterColor,
					toolObj: highlighterTool,
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
