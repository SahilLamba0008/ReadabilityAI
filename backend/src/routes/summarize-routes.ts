import { Router } from "express";
import { summarizeContent } from "../controllers/summarize/summarize-content";

const router = Router();

//@ts-ignore-next-line
router.post("/", summarizeContent);

export default router;
