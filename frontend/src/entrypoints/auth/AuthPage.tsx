import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import "~/assets/global.css";

function AuthPageContent() {
	const { signIn, signUp, resetPassword, loading, error } = useAuth();
	const [tab, setTab] = useState("login");

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [signupEmail, setSignupEmail] = useState("");
	const [signupPassword, setSignupPassword] = useState("");
	const [forgotEmail, setForgotEmail] = useState("");

	const [showLoginPassword, setShowLoginPassword] = useState(false);
	const [showSignupPassword, setShowSignupPassword] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(null);
		await signIn(loginEmail, loginPassword);
		if (!error) {
			setSuccess("Login successful!");
		}
	};

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(null);
		const data = await signUp(signupEmail, signupPassword);
		if (data && !error) {
			setSuccess(`Verification email sent to ${signupEmail}`);
			setSignupEmail("");
			setSignupPassword("");
		}
	};

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(null);
		await resetPassword(forgotEmail);
		if (!error) {
			setSuccess("Password reset email sent!");
			setForgotEmail("");
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

			{success && (
				<div className="text-green-600 text-sm text-center my-2 p-2 bg-green-50 rounded">
					{success}
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
								className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1"
								onClick={() => setShowLoginPassword((v) => !v)}
								disabled={loading}
							>
								{showLoginPassword ? (
									<EyeIcon size={16} />
								) : (
									<EyeClosedIcon size={16} />
								)}
							</Button>
						</div>
					</div>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Logging in..." : "Login"}
					</Button>
					<Button
						variant="link"
						type="button"
						onClick={() => setTab("forgot")}
						disabled={loading}
						className="w-full"
					>
						Forgot Password?
					</Button>
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
								placeholder="Min 6 characters"
								value={signupPassword}
								onChange={(e) => setSignupPassword(e.target.value)}
								required
								disabled={loading}
							/>
							<Button
								type="button"
								variant="ghost"
								className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1"
								onClick={() => setShowSignupPassword((v) => !v)}
								disabled={loading}
							>
								{showSignupPassword ? (
									<EyeIcon size={16} />
								) : (
									<EyeClosedIcon size={16} />
								)}
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
						className="w-full"
					>
						Back to Login
					</Button>
				</form>
			</TabsContent>
		</Tabs>
	);
}

function AuthPage() {
	return (
		<Provider store={store}>
			<AuthPageContent />
		</Provider>
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
