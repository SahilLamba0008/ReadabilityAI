import axios, { AxiosRequestConfig } from "axios";
import React from "react";

interface UseMutationOptions {
	method: "POST" | "PUT" | "PATCH" | "DELETE";
	route: string;
	headers?: Record<string, string>;
	params?: Record<string, any>;
	payload?: any;
	timeout?: number;
	response?: "json" | "text" | "blob";
	baseUrl?: string;
}

interface UseMutationReturn<TData, TPayload = any> {
	data: TData | null;
	loading: boolean;
	error: string | null;
	mutate: (overridePayload?: TPayload) => Promise<TData | undefined>;
}

const useMutation = <TData = any, TPayload = any>(
	opts: UseMutationOptions
): UseMutationReturn<TData, TPayload> => {
	const {
		method,
		route,
		headers = { "Content-Type": "application/json" },
		params = {},
		payload,
		timeout = 10000,
		response = "json",
		baseUrl = "http://localhost:8080/api",
	} = opts;

	const [data, setData] = useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const mutate = React.useCallback(
		async (overridePayload?: any) => {
			try {
				setLoading(true);
				setError(null);

				const config: AxiosRequestConfig = {
					method,
					url: baseUrl + route,
					headers,
					params,
					data: overridePayload ?? payload,
					timeout,
					responseType: response,
				};

				const res = await axios(config);
				setData(res.data);
				console.log("Mutation response data:", res.data);
				return res.data;
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setLoading(false);
			}
		},
		[method, route, headers, payload, timeout, response]
	);

	return { data, loading, error, mutate };
};

export default useMutation;
