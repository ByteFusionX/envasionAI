import { ObjectId, Schema, model } from "mongoose"

export interface userSubsctiptionType extends Document {
    userId: ObjectId,
    stripeCustomerId: string,
    stripeSubscriptionId: string,
    stripePriceId: string,
    stripeCurrentPeriodEnd : Date,
    cancelled : Boolean
}


const userSubsctiption  = new Schema<userSubsctiptionType>({
    userId: {
        type: String,
        required: true,
    },
    stripeCustomerId: {
        type: String,
        required: true,
        unique:true
    },
    stripeSubscriptionId: { 
        type : String,
        required : true,
        unique:true
    },
    stripePriceId: { 
        type : String,
        required : true,
        unique:true
    },
    stripeCurrentPeriodEnd: { 
        type : Date,
        required : true
    },
    cancelled:{
        type:Boolean,
        required : true,
        default : false
    }
})

export default model<userSubsctiptionType>("userSubsctiption",userSubsctiption)