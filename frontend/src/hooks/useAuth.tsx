import { clearUser, setUser } from "@/store/slices/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
				const response = await axios.post("/api/login", { email, password });
				dispatch(setUser(response.data));
			} catch (err) {
				console.error(err);
				setError("Invalid email or password");
			} finally {
				setLoading(false);
			}
		},
		[dispatch]
	);

	const signOut = useCallback(async () => {
		try {
			setLoading(true);
			await axios.post("/api/logout");
			dispatch(clearUser());
			setError(null);
		} catch (err) {
			console.error(err);
			setError("Error logging out");
		} finally {
			setLoading(false);
		}
	}, [dispatch]);

	return { signIn, signOut, user, loading, authenticated, error };
};

export default useAuth;
