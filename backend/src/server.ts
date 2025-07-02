import express from "express";
import dotenv from "dotenv";
import summarizeRoutes from "./routes/summarizeRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/api/summarize", summarizeRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
