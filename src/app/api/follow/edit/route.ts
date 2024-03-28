import {connect} from "@/dbConfig/dbConfig";
import Artist from "@/models/artistModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
//route for adding and removing followers
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {artistId, userId} = reqBody

        // Check if user already follows artist
        const artist = await Artist.findById(artistId)
        const user = await User.findById(userId)

        if (!artist || !user) {
            return NextResponse.json({error: 'Artist or user not found'}, {status: 400})
        }

        // Check if user already follows artist
        const isFollowing = artist.followers.includes(userId)

        if (isFollowing) {
            artist.followers = artist.followers.filter((follower: { toString: () => any; }) => follower.toString() !== userId)
            user.following = user.following.filter((following: { toString: () => any; }) => following.toString() !== artistId)
        } else {
            artist.followers.push(userId)
            user.following.push(artistId)
        }

        await artist.save()
        await user.save()

        return NextResponse.json({message: 'Followers updated successfully', success: true})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}