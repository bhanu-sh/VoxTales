import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    const artist = await User.findById(id);
    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Artist found",
      data: artist,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
