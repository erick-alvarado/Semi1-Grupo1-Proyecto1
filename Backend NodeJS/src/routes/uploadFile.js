import { Router } from "express";
import { uploadFile } from "../controller/uploadFile.js";

const router = Router();

router.post('/uploadfile', uploadFile)

export default router