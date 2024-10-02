import userModel from "@/models/userModel";
import { connectDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try{
        await connectDB();
        const {email, password} = await req.json();
        const user = await userModel.findOne({email});

        if(!user){
            return NextResponse.json({message: 'user does not exists.'}, { status: 400});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({message: 'Invalid password'}, { status: 400});
        }

        const payload = {
            id: user._id,
            userName: user.userName,
            email: user.email
        }

        const secret = process.env.AUTH_SECRET;
        if (!secret) {
            return NextResponse.json({ message: 'Auth secret not defined' }, { status: 500 });
        }

        const token = jwt.sign(payload, secret, { expiresIn: '1d' });

        const response = NextResponse.json({message: 'Logged In Successfull'}, {status: 200});
        response.cookies.set('token', token, { httpOnly: true, path: '/'});
        return response;
    }
    catch(error){
        console.log('error while register', error);
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}