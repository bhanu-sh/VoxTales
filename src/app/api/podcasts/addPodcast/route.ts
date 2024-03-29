import {connect} from "@/dbConfig/dbConfig";
import Podcast from "@/models/podcastModel";
import Artist from "@/models/artistModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {artistId, title, description, audioUrl, imageUrl, duration, genre} = reqBody

        const artist = await Artist.findById(artistId)
        if (!artist) {
            return NextResponse.json({error: "Artist not found"}, {status: 404})
        }

        const newPodcast = new Podcast({
            artistId,
            title,
            description,
            audioUrl,
            imageUrl,
            duration,
            genre
        })

        await newPodcast.save()

        artist.podcasts.push(newPodcast._id)
        await artist.save()

        return NextResponse.json({message: "Podcast added successfully"}, {status: 201})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}