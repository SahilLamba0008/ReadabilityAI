import React from "react";
import ReactDOM from "react-dom/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "~/assets/global.css";

function AuthPage() {
	const [tab, setTab] = React.useState("login");
	return (
		<Tabs
			value={tab}
			onValueChange={setTab}
			className="w-[350px] mx-auto mt-10"
		>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login">Login</TabsTrigger>
				<TabsTrigger value="signup">Sign Up</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<form className="space-y-4">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="you@example.com" />
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" placeholder="Password" />
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
					<div className="flex justify-between mt-2">
						<Button
							variant="link"
							type="button"
							onClick={() => setTab("forgot")}
						>
							Forgot Password?
						</Button>
						<Button
							variant="link"
							type="button"
							onClick={() => {
								/* oAuth logic */
							}}
						>
							Login with Google
						</Button>
					</div>
				</form>
			</TabsContent>
			<TabsContent value="signup">
				<form className="space-y-4">
					<div>
						<Label htmlFor="signup-email">Email</Label>
						<Input
							id="signup-email"
							type="email"
							placeholder="you@example.com"
						/>
					</div>
					<div>
						<Label htmlFor="signup-password">Password</Label>
						<Input
							id="signup-password"
							type="password"
							placeholder="Password"
						/>
					</div>
					<Button type="submit" className="w-full">
						Sign Up
					</Button>
				</form>
			</TabsContent>
			<TabsContent value="forgot">
				<form className="space-y-4">
					<div>
						<Label htmlFor="forgot-email">Email</Label>
						<Input
							id="forgot-email"
							type="email"
							placeholder="you@example.com"
						/>
					</div>
					<Button type="submit" className="w-full">
						Send Reset Link
					</Button>
					<Button variant="link" type="button" onClick={() => setTab("login")}>
						Back to Login
					</Button>
				</form>
			</TabsContent>
			<TabsContent value="reset">
				<form className="space-y-4">
					<div>
						<Label htmlFor="reset-password">New Password</Label>
						<Input
							id="reset-password"
							type="password"
							placeholder="New Password"
						/>
					</div>
					<Button type="submit" className="w-full">
						Reset Password
					</Button>
				</form>
			</TabsContent>
			<TabsContent value="logout">
				<Button
					className="w-full"
					onClick={() => {
						/* logout logic */
					}}
				>
					Logout
				</Button>
			</TabsContent>
		</Tabs>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthPage />
	</React.StrictMode>
);
