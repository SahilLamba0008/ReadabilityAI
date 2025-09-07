import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
	MoreVertical,
	Edit3,
	Twitter,
	ImageIcon,
	Copy,
	Share2,
	Plus,
	SortAsc,
	Highlighter,
	Edit,
	Delete,
	Trash,
	Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useSelector } from "react-redux";
import { highlighterColors } from "@/lib/utils";
import { Highlight } from "@/lib/types";

const Highlights = () => {
	const [sortBy, setSortBy] = useState("recent");
	const storedHighlights = useSelector(
		(state: any) => state.highlighter.highlights
	);

	console.log("stored highlights :", storedHighlights);

	const isDarkMode = false;

	return (
		<div>
			<Card
				className={`p-4 space-y-4 ${
					isDarkMode ? "bg-gray-800 border-gray-700" : "bg-card border-border"
				}`}
			>
				<div className="flex items-center justify-between">
					<h3
						className={`font-medium text-sm ${
							isDarkMode ? "text-gray-200" : "text-foreground"
						}`}
					>
						Your Highlights
					</h3>
					<div className="flex items-center gap-2">
						{/* <Button
							variant="outline"
							size="sm"
							className={`w-8 h-8 p-0 ${
								isDarkMode
									? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300"
									: "bg-transparent"
							}`}
						>
							<Plus className="w-3 h-3" />
						</Button> */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className={`w-8 h-8 p-0 ${
										isDarkMode
											? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300"
											: "bg-transparent"
									}`}
								>
									<SortAsc className="w-3 h-3" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className={
									isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
								}
							>
								<DropdownMenuItem
									onClick={() => setSortBy("recent")}
									className={
										isDarkMode ? "hover:bg-gray-700 focus:bg-gray-700" : ""
									}
								>
									Sort by Recent
								</DropdownMenuItem>
								<DropdownMenuSeparator
									className={isDarkMode ? "bg-gray-700" : ""}
								/>
								<div
									className={`px-2 py-1 text-xs font-medium ${
										isDarkMode ? "text-gray-400" : "text-muted-foreground"
									}`}
								>
									Sort by Color
								</div>
								{highlighterColors.map((color, index) => (
									<DropdownMenuItem
										key={color}
										onClick={() => setSortBy(`color-${index}`)}
										className={
											isDarkMode ? "hover:bg-gray-700 focus:bg-gray-700" : ""
										}
									>
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded-full border"
												style={{ backgroundColor: color }}
											/>
											<span>Color {index + 1}</span>
										</div>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="space-y-3">
					{storedHighlights.map((highlight: Highlight) => {
						// if (highlight === null) {
						// 	return;
						// }
						return (
							<div
								key={highlight.id}
								className={`p-3 border rounded-lg transition-colors relative group border-border hover:bg-accent/50`}
							>
								{/* Header with Title and Menu */}
								<div className="flex items-start justify-between mb-2">
									<div className="flex items-center gap-2 flex-1">
										<div
											className="w-3 h-3 rounded-full flex-shrink-0"
											style={{ backgroundColor: highlight.color }}
										/>
										<h4 className={`text-sm font-medium text-foreground`}>
											{"Title no found"}
										</h4>
									</div>

									{/* More Menu Dropdown */}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												size="sm"
												className={`w-6 h-6 p-0 opacity-60 hover:opacity-100 transition-opacity hover:bg-gray-100 text-gray-500 hover:text-gray-700`}
											>
												<MoreVertical className="w-4 h-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<Edit3 className="w-4 h-4 mr-2" />
												Edit Title
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Edit className="w-4 h-4 mr-2" />
												Edit Content
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Twitter className="w-4 h-4 mr-2" />
												Create Tweet
											</DropdownMenuItem>
											<DropdownMenuItem>
												<ImageIcon className="w-4 h-4 mr-2" />
												Generate Quote Photo
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Copy className="w-4 h-4 mr-2" />
												Copy Text
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Share2 className="w-4 h-4 mr-2" />
												Share Highlight
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Trash2 className="w-4 h-4 mr-2" />
												Delete Highlight
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								{/* Page Info */}
								<p className={`text-xs mb-2 ml-5 text-muted-foreground`}>
									{highlight.page}
								</p>

								{/* Content */}
								<p className={`text-sm leading-relaxed ml-5 text-foreground`}>
									{highlight.text}
								</p>
							</div>
						);
					})}

					{storedHighlights.length === 0 && (
						<div
							className={`text-center py-8 ${
								isDarkMode ? "text-gray-400" : "text-muted-foreground"
							}`}
						>
							<Highlighter className="w-8 h-8 mx-auto mb-2 opacity-50" />
							<p className="text-sm">No highlights yet</p>
							<p className="text-xs">
								Start highlighting content to see it here
							</p>
						</div>
					)}
				</div>
			</Card>
		</div>
	);
};

export default Highlights;
