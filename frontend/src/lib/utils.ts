import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const highlighterColors = [
	"#FEF3C7", // Light Yellow - better for reading
	"#D1FAE5", // Light Green - easier on eyes
	"#DBEAFE", // Light Blue - good contrast
	"#FCE7F3", // Light Pink - accessible
];

export const penColors = ["red", "blue", "yellow", "green"];
