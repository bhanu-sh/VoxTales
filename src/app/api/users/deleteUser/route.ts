import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId } = reqBody;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const following = await User.find({ _id: { $in: user.following } });
    const followers = await User.find({ _id: { $in: user.followers } });

    for (const followingUser of following) {
      followingUser.followers = followingUser.followers.filter(
        (followerId: string) => followerId.toString() !== userId
      );
      await followingUser.save();
    }

    for (const followerUser of followers) {
      followerUser.following = followerUser.following.filter(
        (followingId: string) => followingId.toString() !== userId
      );
      await followerUser.save();
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export default async function deleteUser(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { userId } = reqBody;

//     const user = await User.findById(userId);

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 400 }
//       );
//     }

//     const following = await User.find({ _id: { $in: user.following } });
//     const followers = await User.find({ _id: { $in: user.followers } });

//     for (const followingUser of following) {
//       followingUser.followers = followingUser.followers.filter(
//         (followerId: string) => followerId.toString() !== userId
//       );
//       await followingUser.save();
//     }

//     for (const followerUser of followers) {
//       followerUser.following = followerUser.following.filter(
//         (followingId: string) => followingId.toString() !== userId
//       );
//       await followerUser.save();
//     }

//     await User.findByIdAndDelete(userId);

//     return NextResponse.json(
//       { message: "User deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
