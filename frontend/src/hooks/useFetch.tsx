import { useState } from "react";
import axios from "axios";

const useFetch = <T = any,>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await axios({ method: "GET", url });
			setData(response.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	}, [url]);

	return { data, loading, error, fetchData };
};

export default useFetch;
