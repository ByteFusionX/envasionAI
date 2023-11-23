import { Router } from "express";

import { addUser, getLimit, getMessage, verifyLogin } from "../controllers/user-controller";
import { subscriptionLimit } from "../middlewares/checkApi.middleware";


const router = Router()

router.get('/limit/:id', getLimit)


router.post('/signup', addUser)
router.post('/login', verifyLogin)
router.post('/conversation',subscriptionLimit, getMessage)


export default router;