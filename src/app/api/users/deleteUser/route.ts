import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export default async function deleteUser(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId } = reqBody;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }
    await user.remove();

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}