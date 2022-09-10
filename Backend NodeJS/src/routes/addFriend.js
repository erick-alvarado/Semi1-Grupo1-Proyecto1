import { Router } from "express";
import { addFriend } from "../controller/addFriend.js";

const router = Router();

router.post('/addfriend', addFriend)

export default router