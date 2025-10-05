import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "@/store/slices/authSlice";
import { supabase } from "@/lib/supabase";

const useAuth = () => {
	const dispatch = useDispatch();
	const { user, authenticated } = useSelector((state: any) => state.auth);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const signIn = useCallback(
		async (email: string, password: string) => {
			try {
				setLoading(true);
				setError(null);

				const { data, error: authError } =
					await supabase.auth.signInWithPassword({
						email,
						password,
					});

				if (authError) {
					setError(authError.message);
					return;
				}

				// Save session to browser storage - to sync across extension parts as each page has its own context
				await browser.storage.local.set({
					supabase_session: data.session,
				});
				browser.runtime.sendMessage({
					action: "user_session_set",
				});
			} catch (err) {
				console.error(err);
				setError("Invalid email or password");
			} finally {
				setLoading(false);
			}
		},
		[dispatch]
	);

	const signUp = useCallback(async (email: string, password: string) => {
		try {
			setLoading(true);
			setError(null);

			if (password.length < 6) {
				setError("Password must be at least 6 characters");
				return;
			}

			const { data, error: authError } = await supabase.auth.signUp({
				email,
				password,
			});

			if (authError) {
				setError(authError.message);
				return;
			}

			// Don't dispatch user yet - they need to verify email first
			return data;
		} catch (err) {
			console.error(err);
			setError("Error signing up");
		} finally {
			setLoading(false);
		}
	}, []);

	const signOut = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const { error: authError } = await supabase.auth.signOut();

			if (authError) {
				setError(authError.message);
				return;
			}

			// await browser.storage.local.remove("supabase_session");
			// dispatch(clearUser());
		} catch (err) {
			console.error(err);
			setError("Error logging out");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	const resetPassword = useCallback(async (email: string) => {
		try {
			setLoading(true);
			setError(null);

			const { error: authError } = await supabase.auth.resetPasswordForEmail(
				email,
				{
					redirectTo: `${window.location.origin}/reset-password`,
				}
			);

			if (authError) {
				setError(authError.message);
				return;
			}
		} catch (err) {
			console.error(err);
			setError("Error sending reset email");
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		signIn,
		signUp,
		signOut,
		resetPassword,
		user,
		loading,
		authenticated,
		error,
	};
};

export default useAuth;
