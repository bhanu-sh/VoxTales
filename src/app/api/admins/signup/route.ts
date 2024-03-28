import {connect} from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {name, email, password, adminCode} = reqBody

        console.log(reqBody);

        // Check if user already exists
        const user = await Admin.findOne
        ({email})

        if (user) {
            return NextResponse.json({error: 'User already exists'}, {status: 400})
        }

        // Check if admin code is correct
        if (adminCode !== process.env.ADMIN_CODE) {
            return NextResponse.json({error: 'Invalid admin code'}, {status: 400})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = new Admin({
            email,
            name,
            password: hashedPassword
        })

        // Save user
        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser
        })

        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}