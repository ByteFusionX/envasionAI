import { MAX_FREE_COUNTS } from "../config/constant";
import userApiLimitModel from "../models/userApiLimit.model";
import userSubscriptionModel from "../models/userSubscription.model";

export const increaseLimit = async (userId: string) => {
    const existingUser = await userApiLimitModel.findOne({ userId });

    if (existingUser && existingUser.count < MAX_FREE_COUNTS) {
        await userApiLimitModel.findOneAndUpdate(
            { userId },
            { $inc: { count: 1 }, $set: { updatedAt: Date.now() } }
        );
    } else {
        await userApiLimitModel.create({
            userId,
            count: 1,
            updatedAt: Date.now()
        });
    }

}

export const checkSubscription = async (userId: string) => {
    try {
      const userSubscription = await userSubscriptionModel.findOne({ userId: userId });
  
      if (!userSubscription) {
        return false;
      }
  
      const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + 86_400_000 > Date.now() &&
        !userSubscription.cancelled
  
      return !!isValid;
    } catch (error) {
      console.log(error)
    }
  }

  export const checkApiLimit = async (userId: string) => {

    const userApiLimit = await userApiLimitModel.findOne({ userId: userId })
  
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
      return true;
    } else {
      return false;
    }
  }