import {
	BookOpen,
	Sun,
	User,
	// User
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { dropdownMenuItems } from "@/lib/constants";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
	return (
		<div className="flex items-center justify-between p-4 border-b bg-card border-border">
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800">
					<BookOpen className="w-5 h-5 text-white" />
				</div>
				<span className="font-semibold text-sm text-foreground">
					Readability AI
				</span>
			</div>

			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					// Toggle dark mode functionality can be added here
					onClick={() => {}}
					className="w-8 h-8 p-0 hover:bg-accent"
				>
					<Sun className="w-4 h-4" />
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="w-8 h-8 p-0 hover:bg-accent"
						>
							<div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
								<User className="w-3 h-3 text-white" />
							</div>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<div className="px-2 py-1.5 text-sm font-medium">John ji</div>
						<DropdownMenuSeparator />
						{dropdownMenuItems.map((item, i) => {
							if (item.type === "separator")
								return <DropdownMenuSeparator key={`sep-${i}`} />;
							const Icon = item.icon;
							return (
								<DropdownMenuItem key={item.label}>
									{Icon && <Icon className="w-4 h-4 mr-2" />}
									{item.label}
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default Header;
