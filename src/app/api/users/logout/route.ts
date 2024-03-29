import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    // Set the cookies expiration date to the past
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    response.cookies.set("isAdmin", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
