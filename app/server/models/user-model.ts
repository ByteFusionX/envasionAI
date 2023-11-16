import { Schema, model } from "mongoose"

interface user extends Document {
    name: string,
    email: string,
    password: string
}

const userSchema = new Schema<user>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: { 
        type : String,
        required : true
    }
})

export default model<user>("User",userSchema)