// External and third-party imports
import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/utils/connectDB';
import { authenticateJWT } from '@/lib/middleware/authenticateJWT';
import { UserModel } from '@/lib/models/User';
interface MyRequest extends NextRequest {
  user: {
    userId: string;
  };
}

export async function PUT(req: MyRequest): Promise<NextResponse> {
  try {
    // Authenticate the request and connect to the database
    await authenticateJWT(req);
    await connectDB();

    // Extract the post ID from the request URL
    const userId = req.nextUrl.pathname.split('/').pop();
    const { user } = req;
    // Fetch the user and post from the database
    const userFromDb = await UserModel.findOne({ _id: userId });
    if (!userFromDb) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      });
    }
    const userFollowing = await UserModel.findOne({ _id: user.userId });
    if (!userFollowing) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      });
    }

    //check if userFollowing has followed userFromDb
    const userHasFollowed = await UserModel.findOne({
      _id: user.userId,
      following: userFromDb._id,
    });
    console.log(userHasFollowed);
    if (userHasFollowed) {
      // If the userFollowing has followed userFromDB, unFollow
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userFollowing._id },
        { $pull: { following: userFromDb._id } },
        { new: true },
      );
      await UserModel.findByIdAndUpdate(userFromDb._id, {
        $pull: { followers: userFollowing._id },
      });
      console.log('user unfollowed');
      return NextResponse.json(
        { message: 'User unfollowed', user: updatedUser },
        { status: 200 },
      );
    } else {
      // If the userFollowing has not followed userFromDB, Follow
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userFollowing._id },
        { $addToSet: { following: userFromDb._id } },
        { new: true },
      );

      await UserModel.findOneAndUpdate(
        { _id: userFromDb._id },
        { $addToSet: { followers: userFollowing._id } },
        { new: true },
      );
      console.log('user followed');

      return NextResponse.json(
        {
          message: 'User followed',
          user: updatedUser,
        },
        { status: 201 },
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error); //eslint-disable-line
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    } else {
      console.error(error); //eslint-disable-line
      return NextResponse.json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
}
