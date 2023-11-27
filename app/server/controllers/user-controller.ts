
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const bcrypt = require('bcrypt');
import userModel from "../models/user-model";
import { errorMonitor } from "events";


export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body
        const userExist = await userModel.findOne({ email: email })
        if (userExist) {
            if (userExist.googleId) {
                res.send({ loginWithGoogle: true })
            } else {
                res.send({ alreadySignUp: true })
            }
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = new userModel({
                name: name,
                email: email,
                password: encryptedPassword
            })

            await newUser.save()

            res.send({ status: true })
        }
    } catch (error) {
        next(error)
    }


}

export const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (user) {
            if (!user.password) {
                res.send({ incorrectPassword: true })
            } else {
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
        }
        else {
            res.send({ userExistError: true })
        }
    } catch (error) {
        next(error)
    }
}

export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, name, id, picture } = req.body

        const googleIdCheck = await userModel.findOne({ googleId: id })
        if (googleIdCheck) {
            const payload = { sub: googleIdCheck._id, email: email }
            const token = jwt.sign(payload, process.env.SECRET_KEY!, {
                expiresIn: "2d",
            })
            res.send({ token: token, id: googleIdCheck._id })
        } else {
            const newUser = new userModel({
                name: name,
                email: email,
                googleId: id,
                imageUrl: picture
            })
            const saveCheck = await newUser.save()
            if (saveCheck) {
                const payload = { sub: saveCheck._id, email: email }
                const token = jwt.sign(payload, process.env.SECRET_KEY!, {
                    expiresIn: "2d",
                })
                res.send({ token: token, id: saveCheck._id })
            }

        }

    } catch (error) {
        next(error)
    }
}