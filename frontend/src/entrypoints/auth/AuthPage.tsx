import React from "react";
import ReactDOM from "react-dom/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "~/assets/global.css";
import { supabase } from "@/lib/supabase";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

function AuthPage() {
	const [tab, setTab] = React.useState("login");
	const [loginEmail, setLoginEmail] = React.useState("");
	const [loginPassword, setLoginPassword] = React.useState("");
	const [signupEmail, setSignupEmail] = React.useState("");
	const [signupPassword, setSignupPassword] = React.useState("");
	const [forgotEmail, setForgotEmail] = React.useState("");
	const [successMessage, setSuccessMessage] = React.useState<string | null>(
		null
	);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [showLoginPassword, setShowLoginPassword] = React.useState(false);
	const [showSignupPassword, setShowSignupPassword] = React.useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);
		setLoading(true);

		const { data, error } = await supabase.auth.signInWithPassword({
			email: loginEmail,
			password: loginPassword,
		});

		setLoading(false);

		if (error) {
			setError(error.message);
			return;
		}

		// SUCCESS - redirect or close
		console.log("Login successful!", data.user);
		setSuccessMessage(
			`Login successful! You can close this tab.
			${data.user.email}`
		);
	};

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);

		if (signupPassword.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}

		setLoading(true);

		const { data, error } = await supabase.auth.signUp({
			email: signupEmail,
			password: signupPassword,
		});

		setLoading(false);

		if (error) {
			setError(error.message);
			return;
		}

		setSuccessMessage(
			`Verification email sent to ${data.user?.email}. Please check your inbox.`
		);
		setSignupEmail("");
		setSignupPassword("");
	};

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);

		if (!forgotEmail) {
			setError("Please enter your email");
			return;
		}

		setLoading(true);

		const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
			redirectTo: `${window.location.origin}/reset-password`,
		});

		setLoading(false);

		if (error) {
			setError(error.message);
			return;
		}

		setSuccessMessage("Password reset email sent! Check your inbox.");
		setForgotEmail("");
	};

	const handleGoogleLogin = async () => {
		setError(null);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});

		if (error) {
			setError(error.message);
		}
	};

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

			{error && (
				<div className="text-red-500 text-sm text-center my-2 p-2 bg-red-50 rounded">
					{error}
				</div>
			)}

			{successMessage && (
				<div className="text-green-600 text-sm text-center my-2 p-2 bg-green-50 rounded">
					{successMessage}
				</div>
			)}

			<TabsContent value="login">
				<form className="space-y-4" onSubmit={handleLogin}>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={loginEmail}
							onChange={(e) => setLoginEmail(e.target.value)}
							required
							disabled={loading}
						/>
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Input
								id="password"
								type={showLoginPassword ? "text" : "password"}
								placeholder="Password"
								value={loginPassword}
								onChange={(e) => setLoginPassword(e.target.value)}
								required
								disabled={loading}
							/>
							<Button
								type="button"
								variant="ghost"
								className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs"
								onClick={() => setShowLoginPassword((v) => !v)}
								disabled={loading}
							>
								{showLoginPassword ? <EyeIcon /> : <EyeClosedIcon />}
							</Button>
						</div>
					</div>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Logging in..." : "Login"}
					</Button>
					<div className="flex justify-between mt-2">
						<Button
							variant="link"
							type="button"
							onClick={() => setTab("forgot")}
							disabled={loading}
						>
							Forgot Password?
						</Button>
						<Button
							variant="link"
							type="button"
							onClick={handleGoogleLogin}
							disabled={loading}
						>
							Login with Google
						</Button>
					</div>
				</form>
			</TabsContent>

			<TabsContent value="signup">
				<form className="space-y-4" onSubmit={handleSignup}>
					<div>
						<Label htmlFor="signup-email">Email</Label>
						<Input
							id="signup-email"
							type="email"
							placeholder="you@example.com"
							value={signupEmail}
							onChange={(e) => setSignupEmail(e.target.value)}
							required
							disabled={loading}
						/>
					</div>
					<div>
						<Label htmlFor="signup-password">Password</Label>
						<div className="relative">
							<Input
								id="signup-password"
								type={showSignupPassword ? "text" : "password"}
								placeholder="Password (min 6 characters)"
								value={signupPassword}
								onChange={(e) => setSignupPassword(e.target.value)}
								required
								disabled={loading}
							/>
							<Button
								type="button"
								variant="ghost"
								className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs"
								onClick={() => setShowSignupPassword((v) => !v)}
								disabled={loading}
							>
								{showSignupPassword ? <EyeIcon /> : <EyeClosedIcon />}
							</Button>
						</div>
					</div>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Signing up..." : "Sign Up"}
					</Button>
				</form>
			</TabsContent>

			<TabsContent value="forgot">
				<form className="space-y-4" onSubmit={handleForgotPassword}>
					<div>
						<Label htmlFor="forgot-email">Email</Label>
						<Input
							id="forgot-email"
							type="email"
							placeholder="you@example.com"
							value={forgotEmail}
							onChange={(e) => setForgotEmail(e.target.value)}
							required
							disabled={loading}
						/>
					</div>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Sending..." : "Send Reset Link"}
					</Button>
					<Button
						variant="link"
						type="button"
						onClick={() => setTab("login")}
						disabled={loading}
					>
						Back to Login
					</Button>
				</form>
			</TabsContent>
		</Tabs>
	);
}

const rootElement = document.getElementById("root-auth");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<AuthPage />
		</React.StrictMode>
	);
}
