// External and third-party imports
import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/utils/connectDB';
import { authenticateJWT } from '@/lib/middleware/authenticateJWT';
import { UserModel } from '@/lib/models/User';
import { UserPostModel } from '@/lib/models/UserPosts';
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
    const postId = req.nextUrl.pathname.split('/').pop();
    const { user } = req;

    // Fetch the user and post from the database
    const userFromDb = await UserModel.findOne({ _id: user.userId });
    if (!userFromDb) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      });
    }
    const postFromDb = await UserPostModel.findOne({ _id: postId });
    if (!postFromDb) {
      return NextResponse.json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if the user has already liked the post
    const userHasLiked = postFromDb.likes.includes(userFromDb._id);

    if (userHasLiked) {
      // If the user has liked the post, unlike it
      const updatedPost = await UserPostModel.findOneAndUpdate(
        { _id: postFromDb._id },
        { $pull: { likes: userFromDb._id } },
        { new: true },
      );
      await UserModel.findByIdAndUpdate(userFromDb._id, {
        $pull: { likedPosts: postFromDb._id },
      });

      return NextResponse.json(
        { message: 'Post unliked', post: updatedPost },
        { status: 200 },
      );
    } else {
      // If the user has not liked the post, like it
      const updatedPost = await UserPostModel.findOneAndUpdate(
        { _id: postFromDb._id },
        { $addToSet: { likes: userFromDb._id } },
        { new: true },
      );

      const updatedUserLikes = await UserModel.findOneAndUpdate(
        { _id: userFromDb._id },
        { $addToSet: { likedPosts: postFromDb._id } },
        { new: true },
      );

      return NextResponse.json(
        {
          message: 'Post liked',
          post: updatedPost,
          user: updatedUserLikes,
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
