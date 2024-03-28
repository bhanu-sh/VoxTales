import { NextRequest, NextResponse } from "next/server";
import Artist from "@/models/artistModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const artists = await Artist.find({});
        return NextResponse.json({
            message: "Artists found",
            data: artists
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}