import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  response: NextResponse,
  cookie: string
) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
