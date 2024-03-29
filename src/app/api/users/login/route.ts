import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({error: 'User does not exist'}, {status: 400})
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error: 'Invalid password'}, {status: 400})
        }

        const userType = user.userType

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
        
        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        })
        response.cookies.set('token', token, {
            httpOnly: true,
        })
        if (userType === 'admin') {
            response.cookies.set('isAdmin', 'true', {
                httpOnly: true,
            })
        }
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}