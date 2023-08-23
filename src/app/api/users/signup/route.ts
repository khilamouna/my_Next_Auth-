import {connect} from "../../../../dbConfig/dbConfig"
import User from "../../../../models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
connect()
export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
        const {userName, email, password}= reqBody
        //if user exists already
        const user= await User.findOne({email})
        if (user){
            return NextResponse.json({erro:"user already exists"}, {status:400})
        }
        //hash password
        const salt=await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        const newUser =new User ({userName,email, password})
        const savedUser = await newUser.save()
        return NextResponse.json({message: "user created successfully"}, {status: 201})
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
        
    }
}