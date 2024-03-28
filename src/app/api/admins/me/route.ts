import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/adminModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = getDataFromToken(request);
        const admin = await Admin.findById({ _id: userID }).select('-password');
        return NextResponse.json({
            message : "User Found",
            data : admin
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}