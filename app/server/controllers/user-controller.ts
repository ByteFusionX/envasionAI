
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const bcrypt = require('bcrypt');
import userModel from "../models/user-model";

import { OpenAI } from 'openai';
import userApiLimitModel from "../models/userApiLimit.model";


export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, confirmPassword } = req.body
        const userExist = await userModel.findOne({ email: email })
        if (userExist) {
            res.send({ message: 'User Exists', status: false })
        } else {
            const nameExist = await userModel.findOne({ name: name })
            if (nameExist) {
                res.send({ message: 'Username Exists', status: false })
            } else {
                const encryptedPassword = await bcrypt.hash(password, 10)


                const newUser = new userModel({
                    name: name,
                    email: email,
                    password: encryptedPassword
                })

                newUser.save()

                res.send({ message: 'User Saved', status: true })

            }
        }
        res.send({ message: 'Success', status: true })
    } catch (error) {
        next(error)
    }


}

export const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (user) {
            const hashPassword = await bcrypt.compare(password, user.password)
            if (hashPassword) {
                const payload = { sub: user._id, email: email }
                const token = jwt.sign(payload, process.env.SECRET_KEY!, {
                    expiresIn: "2d",
                })
                res.send({ token: token, id: user._id })
            } else {
                res.send({ incorrectPassword: true })
            }
        }
        else {
            res.send({ userExistError: true })
        }
    } catch (error) {
        next(error)
    }
}

export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, message } = req.body;

        const configuration = {
            apiKey: process.env.OPENAI_API_KEY,
        }

        if (!configuration.apiKey) {
            res.status(500).json({ message: "OpenAI API Key not configured." });
        }

        if (!message) {
            res.status(400).json({ message: "Messages are required" });
        }

        const openai = new OpenAI(configuration);

        const completion = await openai.chat.completions.create({
            messages: [message],
            model: "gpt-3.5-turbo",
        });

        if (completion.choices[0].message) {
            await increaseLimit(userId)
            res.status(200).json(completion.choices[0].message)
        } else {
            res.status(500).json({ message: "Open API credit limit reached" });
        }

    } catch (error) {
        next(error)
    }
}

export const getLimit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }

        const userLimit = await userApiLimitModel.findOne({userId})
        if(userLimit){
            return res.status(200).json(userLimit.count)
        }else{
            const createdLimit = await userApiLimitModel.create({
                userId,
            });

            return res.status(200).json(createdLimit.count)
        }
    } catch (error) {
        next(error)
    }
}




const increaseLimit = async (userId: string) => {
    const existingUser = await userApiLimitModel.findOne({ userId });

    if (existingUser) {
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
