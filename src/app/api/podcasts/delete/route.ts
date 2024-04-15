import { connect } from "@/dbConfig/dbConfig";
import Podcast from "@/models/podcastModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { podcastId } = reqBody;

    const podcast = await Podcast.findById(podcastId);
    const user = await User.findById(podcast?.publisherId);

    if (!podcast || !user) {
      return NextResponse.json(
        { error: "Podcast or user not found" },
        { status: 400 }
      );
    }

    //delete podcast
    await Podcast.findByIdAndDelete(podcastId);

    //remove podcast from user's podcasts array
    user.podcasts = user.podcasts.filter(
      (podcast: { toString: () => any }) => podcast.toString() !== podcastId
    );

    await user.save();

    return NextResponse.json({
      message: "Podcast deleted",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}