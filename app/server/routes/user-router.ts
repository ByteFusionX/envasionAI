import { Router } from "express";

import { addUser, verifyLogin } from "../controllers/user-controller";


const router = Router()

router.post('/signup',addUser)
router.post('/login',verifyLogin)


export default router;