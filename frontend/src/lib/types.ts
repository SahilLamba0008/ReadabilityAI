export interface ToolCommandMessage {
	tool: "pen" | "highlighter";
	action: "enable" | "disable" | "undo" | "redo" | "clear" | "updateColor";
	payload?: any;
}

export interface SettingsMessage {
	type: "getSettings" | "updateSettings";
	settings?: Record<string, any>;
}
