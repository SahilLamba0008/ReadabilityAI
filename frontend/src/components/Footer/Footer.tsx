import React from "react";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
	return (
		<div className={"p-4 border-t bg-card border-border"}>
			<div
				className={
					"flex items-center justify-center gap-2 text-xs text-muted-foreground"
				}
			>
				<span>Powered by</span>
				<Badge variant="secondary">Readability AI</Badge>
			</div>
		</div>
	);
};

export default Footer;
