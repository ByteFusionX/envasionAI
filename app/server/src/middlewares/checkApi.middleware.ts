import { NextFunction, Request, Response } from "express";
import { checkApiLimit, checkSubscription } from "../lib/util";

export const subscriptionLimit = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId || req.params.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const freeTrial = await checkApiLimit(userId);
  const isPro = await checkSubscription(userId);
  
  if (!freeTrial && !isPro) {
    return res.status(403).json({ message: "Free trial has expired. Please upgrade to pro." });
  } else {
    next()
  }

}



