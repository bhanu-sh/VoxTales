import {connect} from "@/dbConfig/dbConfig";
import Artist from "@/models/artistModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        // Check if artist already exists
        const artist = await Artist.findOne({email})
        if (!artist) {
            return NextResponse.json({error: 'Artist does not exist'}, {status: 400})
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, artist.password)
        if (!validPassword) {
            return NextResponse.json({error: 'Invalid password'}, {status: 400})
        }

        // Create token data
        const tokenData = {
            id: artist._id,
            username: artist.username,
            email: artist.email
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
        return NextResponse.json({error: error.message}, {status: 500})
    }
}