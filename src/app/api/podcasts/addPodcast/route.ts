import { connect } from "@/dbConfig/dbConfig";
import Podcast from "@/models/podcastModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { publisherId, publisherName, title, description, audio, genre } = reqBody;

    console.log("Publisher ID:", publisherId);
    const artist = await User.findById(publisherId);
    console.log("Artist:", artist);
    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    const newPodcast = new Podcast({
      publisherId,
      title,
      publisherName,
      description,
      audio,
      genre,
    });

    const savedPodcast = await newPodcast.save();
    console.log(savedPodcast);

    artist.podcasts.push(newPodcast._id);
    await artist.save();

    return NextResponse.json({
      message: "Podcast created successfully",
      success: true,
      savedPodcast,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
