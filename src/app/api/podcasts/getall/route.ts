import { NextRequest, NextResponse } from "next/server";
import Podcast from "@/models/podcastModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

//GET all podcasts route
export async function GET(request: NextRequest) {
    try {
        const podcasts = await Podcast.find({});
        return NextResponse.json({
            message: "Podcasts found",
            data: podcasts
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}