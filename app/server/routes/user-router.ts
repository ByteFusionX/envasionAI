import { Router } from "express";

import { addUser, loginWithGoogle, verifyLogin } from "../controllers/user-controller";


const router = Router()

router.post('/signup',addUser)
router.post('/login',verifyLogin)
router.post('/loginWithGoogle',loginWithGoogle)


export default router;