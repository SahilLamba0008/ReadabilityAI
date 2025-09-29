import { Request, Response } from "express";
import { supabase } from "../../utils/supabase";

export const signin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		console.log("Signin Request Body:", email, password);

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) return res.status(400).json({ error: error.message });

		const session = {
			user: data.user,
			access_token: data.session?.access_token || null,
			refresh_token: data.session?.refresh_token || null,
		};

		return res.status(200).json({ session });
	} catch (err) {
		console.error("Signin Error:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
