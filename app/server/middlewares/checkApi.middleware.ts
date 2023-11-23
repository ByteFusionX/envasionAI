import { NextFunction, Request, Response } from "express";
import userApiLimitModel from "../models/userApiLimit.model"; 
import { MAX_FREE_COUNTS } from "../config/constant";

export const subscriptionLimit = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
    }

    const freeTrial = await checkApiLimit(userId);
    // const isPro = await checkSubscription();

    if (!freeTrial) {
        res.status(403).json({ message: "Free trial has expired. Please upgrade to pro." });
    }else{
    next()
    }

}

const checkApiLimit = async (userId : string) => {
  
    const userApiLimit = await userApiLimitModel.findOne({userId:userId})
  
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
      return true;
    } else {
      return false;
    }
}