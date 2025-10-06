import { Pen, Redo2, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { PenToolCanvas } from "./PenTool";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTool } from "@/store/slices/toolSlice";
import { penColors } from "@/lib/utils";
import { addPenStroke, updatePenColor } from "@/store/slices/penSlice";
import { store } from "@/store/store";

let penTool: PenToolCanvas | null = null;
export const enablePenTool = () => {
	if (!penTool) {
		penTool = new PenToolCanvas({ color: "red" });
	}
	penTool.enable();
};

export const disablePenTool = () => {
	penTool?.disable();
};

export const undoPenToolStroke = () => {
	penTool?.undo();
};

export const redoPenToolStroke = () => {
	penTool?.redo();
};

export const clearPenToolStrokes = () => {
	penTool?.clear();
};

export const updatePenToolColor = (color: string) => {
	penTool?.setColor(color);
};

export const repaintHistoryStrokes = (strokes: []) => {
	console.log("Repainting history strokes from cs payload:", strokes);
	penTool?.loadStrokes(strokes);
};

const PenTool = () => {
	const dispatch = useDispatch();

	const activeTool = useSelector((state: any) => state.tool.activeTool);
	const penEnabled = activeTool === "pen";

	const defaultPenColor = useSelector((state: any) => state.pen.color);
	const [selectedPenColor, setSelectedPenColor] = useState(defaultPenColor);

	const storedStrokes = store.getState().pen.penStrokes;

	useEffect(() => {
		browser.runtime.sendMessage({
			tool: "pen",
			action: penEnabled ? "enable" : "disable",
		});
	}, [penEnabled, activeTool]);

	useEffect(() => {
		if (penEnabled) {
			browser.runtime.sendMessage({
				tool: "pen",
				action: "updateColor",
				payload: {
					color: selectedPenColor,
				},
			});
			dispatch(updatePenColor(selectedPenColor));
		}
	}, [selectedPenColor, penEnabled]);

	useEffect(() => {
		if (storedStrokes.length > 0) {
			console.log("redraw_strokes action called");
			browser.runtime.sendMessage({
				tool: "pen",
				action: "redraw_strokes",
				payload: storedStrokes,
			});
		}
		let lastPayload: any = null;
		const listener = (message: any) => {
			if (message.tool === "pen" && message.type === "add_stroke") {
				const activeTabId = message.activeTabId;
				const senderTabId = message.senderTabId;

				if (typeof activeTabId !== "number" || typeof senderTabId !== "number")
					return;
				if (activeTabId !== senderTabId) return;
				if (message.payload === lastPayload) return;

				lastPayload = message.payload;
				dispatch(addPenStroke(lastPayload));
			}
			if (message.tool === "pen") {
				if (message.type === "clear_all_strokes")
					dispatch({ type: "pen/clearPenStrokes" });
				if (message.type === "undo_last_stroke")
					dispatch({ type: "pen/undoPenStroke" }); // emitting duplicate event due to strict mode
				if (message.type === "redo_last_stroke")
					dispatch({ type: "pen/redoPenStroke" });
			}
		};

		browser.runtime.onMessage.addListener(listener);
		return () => browser.runtime.onMessage.removeListener(listener);
	}, []);

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
				<Switch
					checked={penEnabled}
					onCheckedChange={(checked) => {
						if (checked) {
							dispatch(setActiveTool("pen"));
						} else {
							dispatch(setActiveTool(null));
						}
					}}
				/>
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
								<p>Clear all strokes</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</div>
			)}
		</div>
	);
};

export default PenTool;
