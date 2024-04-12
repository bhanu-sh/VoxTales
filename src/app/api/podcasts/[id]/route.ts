import { connect } from "@/dbConfig/dbConfig";
import Podcast from "@/models/podcastModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    console.log(id);
    const podcast = await Podcast.findById(id);
    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }
    return NextResponse.json({ podcast });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
