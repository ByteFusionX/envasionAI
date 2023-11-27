import { ObjectId, Schema, model } from "mongoose"

interface userLimit extends Document {
    userId: ObjectId,
    count: number,
    createdAt: Date,
    updatedAt: Date
}


const UserApiLimitSchema  = new Schema<userLimit>({
    userId: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
        default:0
    },
    createdAt: { 
        type : Date,
        required : true,
        default:Date.now()
    },
    updatedAt: { 
        type : Date,
        required : true
    }
})

export default model<userLimit>("UserApiLimit",UserApiLimitSchema)