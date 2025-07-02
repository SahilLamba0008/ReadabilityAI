import { Router } from "express";
import { summarizeContent } from "../controllers/summarizeContent";

const router = Router();

//@ts-ignore-next-line
router.post("/", summarizeContent);

export default router;
