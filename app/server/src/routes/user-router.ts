import { Router } from "express";
import express from 'express';

import { addUser, getLimit, getMessage, verifyLogin,getpaymentUrl, stripWebhook, checkSubscription } from "../controllers/user-controller";
import { subscriptionLimit } from "../middlewares/checkApi.middleware";


const router = Router()

router.get('/limit/:id', getLimit)
router.get('/stripe/:userId', getpaymentUrl)
router.get('/checkSubscription/:userId', checkSubscription)


router.post('/signup', addUser)
router.post('/login', verifyLogin)
router.post('/conversation/:userId',subscriptionLimit, getMessage)
router.post('/webhook', express.raw({ type: 'application/json' }), stripWebhook)


export default router;