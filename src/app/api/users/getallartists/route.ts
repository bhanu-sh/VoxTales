import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const artists = await User.find({});
        const artistList = artists.filter((artist) => artist.role === "artist");
        return NextResponse.json({
            message: "Artists found",
            data: artistList
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}