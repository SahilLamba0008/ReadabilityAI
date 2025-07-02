import express from "express";
import dotenv from "dotenv";
import summarize from "./routes/summarize";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/api/summarize", summarize);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
