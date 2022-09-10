import { Router } from "express";
import { viewFiles } from "../controller/viewFiles.js";

const router = Router();

router.get('/viewfiles/:id', viewFiles)

export default router