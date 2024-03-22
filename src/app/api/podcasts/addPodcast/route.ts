import {connect} from "@/dbConfig/dbConfig";
import Podcast from "@/models/podcastModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {title, description, url, image, category} = reqBody

        // Create new podcast
        const newPodcast = new Podcast({
            title,
            description,
            url,
            image,
            category
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}