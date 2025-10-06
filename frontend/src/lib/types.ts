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
	// userId?: string;
}

export type Stroke = {
	pageUrl: string;
	userId?: string;
	points: { x: number; y: number }[];
	color: string;
};

export type Highlight = {
	id: string;
	text: string;
	color: string;
	range: Range;
	pageUrl: string;
	userId?: string;
	title?: string;
};

export type StoreHighlight = Pick<
	Highlight,
	"id" | "text" | "color" | "title" | "pageUrl" | "userId"
>;
