// src/controllers/auth.ts
import { Request, Response } from "express";
import { supabase } from "../../utils/supabase";

export const signup = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) return res.status(400).json({ error: error.message });

		return res.status(201).json({
			user: data.user,
			message:
				"User registered successfully. Please check your email to confirm.",
		});
	} catch (err) {
		console.error("Signup Error:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
