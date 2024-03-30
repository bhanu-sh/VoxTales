import {connect} from "@/dbConfig/dbConfig";
import Artist from "@/models/artistModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {avatar, email, password, name} = reqBody

        console.log(reqBody);

        // Check if user already exists
        const user = await Artist.findOne({email})

        if (user) {
            return NextResponse.json({error: 'User already exists'}, {status: 400})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = new Artist({
            avatar,
            email,
            name,
            password: hashedPassword
        })

        // Save user
        const savedUser = await newUser.save()
        console.log(savedUser);

        // Send verification email
        await sendEmail({email, emailType: "artistVERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}