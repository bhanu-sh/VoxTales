import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import Artist from "@/models/artistModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = getDataFromToken(request);
        const artist = await Artist.findById({ _id: userID }).select('-password');
        return NextResponse.json({
            message : "User Found",
            data : artist
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}