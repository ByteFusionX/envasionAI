
import { Request, Response, NextFunction } from "express";
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