import { Router } from "express";
import { allUsers } from "../controller/allUsers.js";

const router = Router();

router.get('/allusers', allUsers)

export default router