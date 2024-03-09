import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const userID = getDataFromToken(request);
        const user = await User.findById({ _id: userID }).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: "Invalid User" },
                { status: 400 }
            );
        }

        // Assuming the request body contains updated user profile data
        const { avatar, username, name, bio, email, newPassword } = await request.json();

        // Update user profile fields
        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        if (username) {
            user.username = username;
        }

        if (avatar) {
            user.avatar = avatar;
        }


            user.bio = bio;


        if (newPassword) {
            // Hash the new password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
        }

        //create a new prop if not in model
        // user.newProp = "new value";



        // Save the updated user profile
        await user.save();

        console.log("User profile updated:", user);

        return NextResponse.json(
            { message: "User profile updated successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
