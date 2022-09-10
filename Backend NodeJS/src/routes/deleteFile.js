import { Router } from "express";
import { deleteFile } from "../controller/deleteFile.js";

const router = Router();

router.delete('/deletefile', deleteFile)

export default router