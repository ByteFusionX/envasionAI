import { Router } from "express";
import express from 'express';

import { addUser, getLimit, getMessage, verifyLogin, getpaymentUrl, stripWebhook, checkSubscription, getUserDetails, videoGenarator, signUpWithGoogle, loginWithGoogle } from "../controllers/user-controller";
import { subscriptionLimit } from "../middlewares/checkApi.middleware";


const router = Router()

router.get('/limit/:id', getLimit)
router.get('/stripe/:userId', getpaymentUrl)
router.get('/checkSubscription/:userId', checkSubscription)
router.get('/profile/:userId', getUserDetails)


router.post('/signup', addUser)
router.post('/login', verifyLogin)
router.post('/signUpWithGoogle', signUpWithGoogle)
router.post('/loginWithGoogle', loginWithGoogle)
router.post('/conversation/:userId', subscriptionLimit, getMessage)
router.post('/webhook', express.raw({ type: 'application/json' }), stripWebhook)
router.post('/vedioGenarater/:userId', subscriptionLimit, videoGenarator)


export default router;