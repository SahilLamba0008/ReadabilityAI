import { Router } from "express";
import { summarizeContent } from "../controllers/summarize/summarize-content";

export const router = Router();

//@ts-ignore-next-line
router.post("/", summarizeContent);
