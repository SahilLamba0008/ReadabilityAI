import { Minus, Pen, Redo, SwatchBook, Trash, Undo } from "lucide-react";
import { Button } from "../ui/button";

const PenTool = () => {
	return (
		<div className="py-2 my-1 flex justify-between">
			<Button variant="secondary" size="icon" className="size-9">
				<Pen />
			</Button>
			<Minus className="text-muted-foreground/40 self-center" />
			<div className="flex gap-1">
				<Button variant="secondary" size="icon" className="size-9">
					<SwatchBook />
				</Button>
				<div className="flex gap-1">
					<div className="w-px bg-border h-full" />
					<Button variant="secondary" size="icon" className="size-9">
						<Undo />
					</Button>
					<Button variant="secondary" size="icon" className="size-9">
						<Redo />
					</Button>
					<div className="w-px bg-border h-full" />
				</div>
				<Button variant="secondary" size="icon" className="size-9">
					<Trash />
				</Button>
			</div>
		</div>
	);
};

export default PenTool;
