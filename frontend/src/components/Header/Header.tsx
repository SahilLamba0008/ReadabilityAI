import {
	BookOpen,
	Sun,
	Moon,
	Settings,
	User,
	HelpCircle,
	Bug,
	Heart,
	Crown,
	LogOut,
	LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";

const Header = () => {
	const user = useSelector((state: any) => state.auth.user);
	const { signOut } = useAuth();

	return (
		<div
			className={
				"flex items-center justify-between p-4 border-b bg-card border-border"
			}
		>
			<div className="flex items-center gap-2">
				<div
					className={
						"w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800"
					}
				>
					<BookOpen className="w-5 h-5 text-white" />
				</div>
				<span className={"font-semibold text-sm text-foreground"}>
					Readability AI
				</span>
			</div>

			<div className="flex items-center gap-1">
				{/* <Button
					variant="ghost"
					size="sm"
					className={"w-8 h-8 p-0 hover:bg-accent"}
				>
					{false ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
				</Button> */}

				{/* <Button
					variant="ghost"
					size="sm"
					className={"w-8 h-8 p-0 hover:bg-accent"}
				>
					<Settings className="w-4 h-4" />
				</Button> */}

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className={"w-8 h-8 p-0 hover:bg-accent"}
						>
							<div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
								<User className="w-3 h-3 text-white" />
							</div>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className={"w-48 bg-white"}>
						{user && (
							<>
								<div className="px-2 py-1.5 text-sm font-medium">
									{user.email}
								</div>
								<DropdownMenuSeparator />
							</>
						)}
						<DropdownMenuItem>
							<HelpCircle className="w-4 h-4 mr-2" />
							FAQ's
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Bug className="w-4 h-4 mr-2" />
							Bug Report
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Heart className="w-4 h-4 mr-2" />
							Sponsor
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Crown className="w-4 h-4 mr-2" />
							Buy Premium
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						{user ? (
							<DropdownMenuItem onClick={signOut}>
								<LogOut className="w-4 h-4 mr-2" />
								Sign Out
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem
								onClick={() => browser.tabs.create({ url: "/auth.html" })}
							>
								<LogIn className="w-4 h-4 mr-2" />
								Sign In
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default Header;
