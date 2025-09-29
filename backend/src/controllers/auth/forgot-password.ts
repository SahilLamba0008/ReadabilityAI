import { Request, Response } from "express";
import { supabase } from "../../utils/supabase";

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ error: "Email is required" });
		}

		const { data, error } = await supabase.auth.resetPasswordForEmail(
			email
			//     {
			// 	redirectTo: "frontend url", // optional
			// }
		);

		if (error) return res.status(400).json({ error: error.message });

		return res.status(200).json({ message: "Password reset email sent" });
	} catch (err) {
		console.error("Forgot Password Error:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
