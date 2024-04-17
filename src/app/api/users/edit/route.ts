import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const userID = getDataFromToken(request);
    const user = await User.findById({ _id: userID }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }

    const { avatar, name, dob, gender, email, oldPassword, newPassword } =
      await request.json();

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (avatar) {
      user.avatar = avatar;
    }

    if (dob) {
      user.dateOfBitrh = dob;
    }

    if (gender) {
      user.gender = gender;
    }

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return NextResponse.json(
          { error: "Invalid old password" },
          { status: 400 }
        );
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

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
