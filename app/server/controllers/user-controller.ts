
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const bcrypt = require('bcrypt');
import userModel from "../models/user-model";


export const addUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {name,email,password,confirmPassword} = req.body
        const userExist = await userModel.findOne({email:email})
        if(userExist){
            res.send({message:'User Exists',status:false})
        }else{
            const nameExist = await userModel.findOne({name:name})
            if(nameExist){
                res.send({message:'Username Exists',status:false})
            }else{
                const encryptedPassword =await bcrypt.hash(password,10)
                

                const newUser = new userModel({
                    name:name,
                    email:email,
                    password:encryptedPassword
                })
               
                newUser.save()
                
                res.send({message:'User Saved',status:true})

            }
        }
       res.send({message:'Success',status:true})
    } catch (error) {
        next(error)
    }

   
}  

export const verifyLogin = async (req:Request , res:Response , next:NextFunction)=>{
    try {
        const {email,password}=req.body
        const user = await userModel.findOne({email:email})
        if(user){
            const hashPassword = await bcrypt.compare(password,user.password)
            if(hashPassword){
                const payload = {sub:user._id,email:email}
                const token = jwt.sign(payload,process.env.SECRET_KEY!,  {
                    expiresIn: "2d",
                  })
                  res.send({token:token,id:user._id})
            }else{
                res.send({incorrectPassword:true})
            }
        }
        else{
            res.send({userExistError:true})
        }
    } catch (error) {
        next(error)
    }
}