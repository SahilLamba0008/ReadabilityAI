export type ToolType = "pen" | "highlighter" | null;
export interface ToolCommandMessage {
	tool: "pen" | "highlighter";
	action: "enable" | "disable" | "undo" | "redo" | "clear" | "updateColor";
	payload?: any;
}

export interface SettingsMessage {
	type: "getSettings" | "updateSettings";
	settings?: Record<string, any>;
}

export interface PenToolOptions {
	color?: string;
	lineWidth?: number;
	lineCap?: CanvasLineCap;
	zIndex?: number;
}

export type Stroke = {
	points: { x: number; y: number }[];
	color: string;
};

export type Highlight = {
	id: string;
	text: string;
	color: string;
	range: Range;
	spans: HTMLSpanElement[];
	page?: string;
	title?: string;
};
