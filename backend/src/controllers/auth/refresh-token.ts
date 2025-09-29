// src/controllers/auth.ts
import { Request, Response } from "express";
import { supabase } from "../../utils/supabase";

export const refreshToken = async (req: Request, res: Response) => {
	try {
		const { refresh_token } = req.body;

		if (!refresh_token) {
			return res.status(400).json({ error: "Refresh token is required" });
		}

		const { data, error } = await supabase.auth.refreshSession({
			refresh_token,
		});

		if (error) return res.status(400).json({ error: error.message });

		return res.status(200).json({
			user: data.session?.user,
			access_token: data.session?.access_token,
			refresh_token: data.session?.refresh_token,
		});
	} catch (err) {
		console.error("Refresh Token Error:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
