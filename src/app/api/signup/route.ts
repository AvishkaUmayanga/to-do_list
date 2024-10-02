import userModel from "@/models/userModel";
import { connectDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    try{
        await connectDB();
        const {email, userName, password} = await req.json();

        const existingEmail = await userModel.findOne({email});
        if(existingEmail){
            return NextResponse.json({message: 'email already exists.'}, { status: 403});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            email,
            userName,
            password: hashedPassword,
        })
        await newUser.save();

        return NextResponse.json({message: 'signup successfull'}, {status: 201})
    }
    catch(error){
        console.log('error while register', error);
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}