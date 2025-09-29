// src/controllers/auth.ts
import { Request, Response } from "express";
import { supabase } from "../../utils/supabase";

export const signout = async (req: Request, res: Response) => {
	try {
		const access_token = req.headers.authorization?.split(" ")[1];

		if (!access_token) {
			return res
				.status(400)
				.json({ error: "Access token is required for signout" });
		}
		// Note: Supabase does not have a direct sign-out method for server-side.
		// Invalidate the session on the client side by removing tokens eg. await supabase.auth.signOut().
		// Here, we just respond with a success message.
		return res.status(200).json({ message: "Signed out successfully" });
	} catch (err) {
		console.error("Signout Error:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
