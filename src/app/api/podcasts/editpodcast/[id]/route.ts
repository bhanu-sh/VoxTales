import { connect } from "@/dbConfig/dbConfig";
import Podcast from "@/models/podcastModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    console.log("Podcast: " + id);

    const podcast = await Podcast.findById(id);

    console.log("Podcast: " + podcast);

    if (!podcast) {
      return NextResponse.json({ error: "Invalid Podcast" }, { status: 400 });
    }

    const {
      title,
      image,
      description,
      audio,
      genre,
      publisherId,
      publisherName,
    } = await request.json();

    console.log("Publisher name: " + publisherName);

    if (title) {
      podcast.title = title;
    }

    if (description) {
      podcast.description = description;
    }

    if (audio) {
      podcast.audio = audio;
    }

    if (genre) {
      podcast.genre = genre;
    }

    if (publisherId) {
      podcast.publisherId = publisherId;
    }

    if (image) {
      console.log("got image: " + image);
      podcast.image = image;
    }

    if (publisherName) {
      podcast.publisherName = publisherName;
    }

    await podcast.save()

    console.log("Podcast updated:", podcast);

    return NextResponse.json(
      { message: "Podcast updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
