import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

const SummarizeButton = () => {
	return (
		<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring px-4 py-2 text-sm rounded-lg flex items-center gap-1 w-full justify-center">
			<Sparkles className="h-4 w-4" />
			Summarize
		</Button>
	);
};

export default SummarizeButton;
