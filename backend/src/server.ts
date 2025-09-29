import express from "express";
import dotenv from "dotenv";
import { router as summarizeRoutes } from "./routes/summarize-routes";
import { router as authRoutes } from "./routes/auth-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/api/summarize", summarizeRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
