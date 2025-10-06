"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	BookOpen,
	Sun,
	Moon,
	Settings,
	Power,
	Crown,
	Check,
	Sparkles,
	Blinds as Lines,
	ListOrdered,
	List,
	Smile,
	RefreshCw,
	LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import useAuth from "@/hooks/useAuth";

let sessionCache: any = null;
let cacheInitialized = false;

// Initialize cache immediately
if (!cacheInitialized) {
	browser.storage.local.get("supabase_session").then(({ supabase_session }) => {
		sessionCache = supabase_session;
		cacheInitialized = true;
	});
}

export default function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [status, setStatus] = useState<"enabled" | "disabled">("enabled");
	const [user, setUser] = useState<string | undefined>(
		sessionCache?.user?.email
	);
	const { signOut } = useAuth();

	function handleSave() {
		// Hook into extension state persistence
		alert(`Extension ${status === "enabled" ? "enabled" : "disabled"}.`);
	}

	function handlePremium() {
		alert("Go Premium flow");
	}

	function handleLogin() {
		// alert("Login flow");
		browser.tabs.create({ url: "/auth.html" });
	}

	function handleSignup() {
		alert("Signup flow");
	}

	useEffect(() => {
		async function restoreSession() {
			const { supabase_session } = await browser.storage.local.get(
				"supabase_session"
			);

			if (supabase_session) {
				sessionCache = supabase_session; // Update cache
				await supabase.auth.setSession({
					access_token: supabase_session.access_token,
					refresh_token: supabase_session.refresh_token,
				});
				setUser(supabase_session.user.email);
			} else {
				sessionCache = null;
				setUser(undefined);
			}
		}

		restoreSession();

		const listener = (changes: any, areaName: string) => {
			if (areaName === "local" && changes.supabase_session) {
				const session = changes.supabase_session.newValue;
				sessionCache = session; // Update cache

				if (session) {
					supabase.auth.setSession({
						access_token: session.access_token,
						refresh_token: session.refresh_token,
					});
					setUser(session.user.email);
				} else {
					setUser(undefined);
				}
			}
		};

		browser.storage.onChanged.addListener(listener);

		return () => {
			browser.storage.onChanged.removeListener(listener);
		};
	}, []);
	return (
		<main
			className={`w-[350px] h-[400px] overflow-y-scroll ${
				isDarkMode
					? "dark bg-gray-900 text-gray-100"
					: "bg-background text-foreground"
			}`}
		>
			{/* Header — matches Sidepanel style */}
			<header
				className={`fixed top-0 w-[95%] z-0 flex items-center justify-between px-3 py-2 border-b ${
					isDarkMode ? "bg-gray-800 border-gray-700" : "bg-card border-border"
				}`}
			>
				<div className="flex items-center gap-2">
					<div
						className={`w-7 h-7 rounded-md flex items-center justify-center ${
							isDarkMode
								? "bg-gradient-to-br from-blue-500 to-purple-600"
								: "bg-gradient-to-br from-slate-600 to-slate-800"
						}`}
					>
						<BookOpen className="w-4 h-4 text-white" />
					</div>
					<span
						className={`text-sm font-semibold ${
							isDarkMode ? "text-gray-100" : "text-foreground"
						}`}
					>
						Readability AI
					</span>
				</div>

				<div className="flex items-center gap-1">
					{/* <Button
						variant="ghost"
						size="sm"
						onClick={() => setIsDarkMode(!isDarkMode)}
						className={`w-8 h-8 p-0 ${
							isDarkMode
								? "hover:bg-gray-700 text-gray-300 hover:text-gray-100"
								: "hover:bg-accent"
						}`}
						aria-label="Toggle theme"
					>
						{isDarkMode ? (
							<Sun className="w-4 h-4" />
						) : (
							<Moon className="w-4 h-4" />
						)}
					</Button> */}
					<Button
						variant="ghost"
						size="sm"
						className={`w-8 h-8 p-0 ${
							isDarkMode
								? "hover:bg-gray-700 text-gray-300 hover:text-gray-100"
								: "hover:bg-accent"
						}`}
						aria-label="Settings"
					>
						<Settings className="w-4 h-4" />
					</Button>
					{/* <Button
						variant="ghost"
						size="sm"
						onClick={() =>
							setStatus(status === "enabled" ? "disabled" : "enabled")
						}
						className={`w-7 h-7 p-0 border-2 ${
							status === "enabled"
								? "bg-yellow-500 border-yellow-200 hover:bg-yellow-600"
								: "bg-gray-500 border-gray-200 hover:bg-gray-600 opacity-60"
						}`}
						aria-label="Toggle extension status"
					>
						<Power
							className={`w-4 h-4 ${
								status === "enabled"
									? "text-yellow-700"
									: "text-white opacity-90"
							}`}
						/>
					</Button> */}
				</div>
			</header>

			{/* Body */}
			<div className="p-3 space-y-3 mt-[50px]">
				{/* 1) Extension Enable/Disable (first thing after header)
				<Card
					className={`${
						isDarkMode ? "bg-gray-800 border-gray-700" : "bg-card border-border"
					} p-3`}
				>
					<div className="flex items-center justify-between">
						<h3
							className={`text-sm font-semibold ${
								isDarkMode ? "text-gray-200" : "text-foreground"
							}`}
						>
							Extension Status
						</h3>
					</div>
					<RadioGroup
						value={status}
						onValueChange={(val) => setStatus(val as "enabled" | "disabled")}
						className="mt-2 grid grid-cols-2 gap-2"
					>
						<label
							htmlFor="enabled"
							className={`flex items-center gap-2 border rounded-md px-2 py-2 cursor-pointer transition-colors ${
								status === "enabled"
									? isDarkMode
										? "border-emerald-400/70 bg-emerald-500/10"
										: "border-emerald-400 bg-emerald-50/70"
									: "hover:bg-accent"
							}`}
						>
							<RadioGroupItem id="enabled" value="enabled" />
							<span className="text-xs">Enabled</span>
						</label>
						<label
							htmlFor="disabled"
							className={`flex items-center gap-2 border rounded-md px-2 py-2 cursor-pointer transition-colors ${
								status === "disabled"
									? isDarkMode
										? "border-rose-400/70 bg-rose-500/10"
										: "border-rose-400 bg-rose-50/70"
									: "hover:bg-accent"
							}`}
						>
							<RadioGroupItem id="disabled" value="disabled" />
							<span className="text-xs">Disabled</span>
						</label>
					</RadioGroup>
				</Card> */}

				{/* 2) Auth Card (Login / Sign up) */}
				{user ? (
					<Card
						className={`${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-card border-border"
						} p-3 flex justify-center items-center`}
					>
						<h6
							className={`font-semibold ${
								isDarkMode ? "text-gray-200" : "text-foreground"
							}`}
						>
							Logged In Successfully
						</h6>
						<p className="-mt-3 bg-green-700 rounded-full px-2 italic text-green-200 ring-3 shadow-2xl">
							{user}
						</p>
						<Button
							variant="outline"
							className="bg-transparent -mt-3"
							size={"sm"}
							onClick={signOut}
						>
							<LogOut />
							Sign Out
						</Button>
					</Card>
				) : (
					<Card
						className={`${
							isDarkMode
								? "bg-gray-800 border-gray-700"
								: "bg-card border-border"
						} p-3`}
					>
						<h3
							className={`text-sm font-semibold ${
								isDarkMode ? "text-gray-200" : "text-foreground"
							}`}
						>
							Get started
						</h3>
						<p
							className={`text-xs mt-1 ${
								isDarkMode ? "text-gray-400" : "text-muted-foreground"
							}`}
						>
							Create an account or sign in to sync highlights, access summaries,
							and manage preferences.
						</p>

						<div className="mt-3 grid grid-cols-2 gap-2">
							<Button
								variant="outline"
								className={`${
									isDarkMode
										? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-200"
										: ""
								} h-9`}
								onClick={handleLogin}
							>
								Log in
							</Button>
							<Button
								className={`h-9 ${
									isDarkMode
										? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
										: "bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900"
								}`}
								onClick={handleSignup}
							>
								Sign up
							</Button>
						</div>
					</Card>
				)}

				{/* 3) Premium Upsell (no 'Premium Access' in header; regular user conversion) */}
				<Card
					className={`${
						isDarkMode ? "bg-gray-800 border-gray-700" : "bg-card border-border"
					} p-3`}
				>
					<div className="flex items-start justify-between gap-2">
						<div>
							<div className="flex items-center gap-2">
								<Crown className="w-4 h-4 text-yellow-500" />
								<h3 className="text-sm font-semibold">Unlock Premium</h3>
							</div>
							<p
								className={`text-xs mt-1 ${
									isDarkMode ? "text-gray-400" : "text-muted-foreground"
								}`}
							>
								More powerful AI tools and convenience features for readers.
							</p>
						</div>
						<Badge
							variant="secondary"
							className={`text-[10px] ${
								isDarkMode ? "bg-gray-700 text-gray-200" : ""
							}`}
						>
							Popular
						</Badge>
					</div>

					<ul className="mt-3 space-y-1.5">
						<li className="flex items-start gap-2">
							<Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
							<span className="text-xs">Unlimited page summarize</span>
						</li>
						<li className="flex items-start gap-2">
							<Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
							<span className="text-xs">
								Controlled summaries with desired formats
							</span>
						</li>
					</ul>

					{/* Formats chips (paragraph, bullets, emoji, numbered list) */}
					<div className="mt-2 flex flex-wrap gap-1.5">
						<Badge
							variant="secondary"
							className={`gap-1 ${
								isDarkMode ? "bg-gray-700 text-gray-200" : ""
							}`}
						>
							<Lines className="w-3.5 h-3.5" />
							<span className="text-[11px]">Paragraph</span>
						</Badge>
						<Badge
							variant="secondary"
							className={`gap-1 ${
								isDarkMode ? "bg-gray-700 text-gray-200" : ""
							}`}
						>
							<List className="w-3.5 h-3.5" />
							<span className="text-[11px]">Bullet points</span>
						</Badge>
						<Badge
							variant="secondary"
							className={`gap-1 ${
								isDarkMode ? "bg-gray-700 text-gray-200" : ""
							}`}
						>
							<ListOrdered className="w-3.5 h-3.5" />
							<span className="text-[11px]">Numbered list</span>
						</Badge>
						<Badge
							variant="secondary"
							className={`gap-1 ${
								isDarkMode ? "bg-gray-700 text-gray-200" : ""
							}`}
						>
							<Smile className="w-3.5 h-3.5" />
							<span className="text-[11px]">Emoji</span>
						</Badge>
					</div>

					<ul className="mt-2 space-y-1.5">
						<li className="flex items-start gap-2">
							<Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
							<span className="text-xs">
								Restore pen strokes and highlights created
							</span>
						</li>
						<li className="flex items-start gap-2">
							<Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
							<span className="text-xs">
								Highlights and pen strokes are unlimited
							</span>
						</li>
					</ul>

					<div className="mt-3 flex items-center gap-2">
						<Button
							onClick={handlePremium}
							className={`flex-1 h-9 ${
								isDarkMode
									? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
									: "bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900"
							}`}
						>
							<Sparkles className="w-4 h-4 mr-2" />
							Go Premium
						</Button>
						<Button
							variant="outline"
							className={`h-9 ${
								isDarkMode
									? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-200"
									: "bg-transparent"
							}`}
							onClick={() => alert("Restore purchases")}
						>
							<RefreshCw className="w-4 h-4 mr-2" />
							Restore
						</Button>
					</div>
				</Card>
			</div>
		</main>
	);
}
