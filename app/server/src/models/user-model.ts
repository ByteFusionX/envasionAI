import { Schema, model } from "mongoose"

interface user extends Document {
    name: string,
    email: string,
    password: string
    imageUrl?: string
    googleId?: string
}

const userSchema = new Schema<user>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    googleId: {
        type: String
    }
})


export default model<user>("User", userSchema)