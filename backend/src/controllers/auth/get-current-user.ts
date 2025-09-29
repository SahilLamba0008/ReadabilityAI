// src/controllers/auth.ts
import { Request, Response } from "express";
import { supabase } from "../../utils/supabase";

export const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const access_token = req.headers.authorization?.split(" ")[1];

		if (!access_token) {
			return res.status(401).json({ error: "Access token is required" });
		}

		const {
			data: { user },
			error,
		} = await supabase.auth.getUser(access_token);

		if (error || !user) {
			return res.status(401).json({ error: "Invalid or expired access token" });
		}

		return res.status(200).json({ user });
	} catch (err) {
		console.error("Get Current User Error:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
