import { Pen, Redo2, Trash2, Undo2 } from "lucide-react";
import { Button } from "../ui/button";

const PenTool = () => {
	return (
		<div>
			<h2 className="text-sm font-semibold mb-2 text-cyan-400 flex items-center">
				Pen
			</h2>
			<div>
				<Button variant="ghost" size="sm">
					<Pen className="w-4 h-4" />
				</Button>

				<div className="flex items-center gap-2">
					<div className="relative">
						<Button
							variant="ghost"
							size="sm"
							className="border border-gray-600 hover:border-gray-500 p-2"
						>
							<div className="w-4 h-4 rounded-full border border-gray-500" />
						</Button>
					</div>

					<Button
						variant="ghost"
						size="sm"
						className="text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500"
						title="Clear All Pen Strokes"
					>
						<Trash2 className="w-4 h-4" />
					</Button>

					<Button
						variant="ghost"
						size="sm"
						className="text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500"
						title="Undo (Ctrl+Z)"
					>
						<Undo2 className="w-4 h-4" />
					</Button>

					<Button
						variant="ghost"
						size="sm"
						className="text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500"
						title="Redo (Ctrl+X)"
					>
						<Redo2 className="w-4 h-4" />
					</Button>
				</div>

				<div className="text-xs text-gray-500 space-y-1">
					<div>Undo: Ctrl+Z</div>
					<div>Redo: Ctrl+X</div>
				</div>
			</div>
			{/* Color box */}
		</div>
	);
};

export default PenTool;
