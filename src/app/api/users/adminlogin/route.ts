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

        // Check if admin already exists
        const admin = await User.findOne
        ({email})

        if (!admin) {
            console.log('Admin does not exist')
            return NextResponse.json({error: 'Admin does not exist'}, {status: 400})
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, admin.password)
        if (!validPassword) {
            console.log('Invalid password')
            return NextResponse.json({error: 'Invalid password'}, {status: 400})
        }

        // Create token data
        const tokenData = {
            id: admin._id,
            email: admin.email
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
        
        return response;
    }

    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}