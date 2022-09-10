import { Router } from "express";
import { editFile } from "../controller/editFile.js";

const router = Router();

router.put('/editfile/:id', editFile)

export default router