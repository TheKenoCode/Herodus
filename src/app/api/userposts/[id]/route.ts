// Additional imports for image uploading
import { NextRequest, NextResponse } from 'next/server';

// Internal imports and utilities
import connectDB from '@/lib/utils/connectDB';
import { authenticateJWT } from '@/lib/middleware/authenticateJWT';
import { UserPostModel } from '@/lib/models/UserPosts';

export const dynamic = 'force-dynamic';

// Cloudinary configuration remains unchanged

interface MyRequest extends NextRequest {
  user: {
    userId: string;
  };
}

/**
 * GET handler to retrieve a user post by ID.
 */
export async function GET(req: MyRequest): Promise<NextResponse> {
  await connectDB();

  // Extract the postId from the URL
  const postId = req.nextUrl.pathname.split('/').pop();

  // Validate the postId
  if (!postId) {
    return NextResponse.json(
      { success: false, message: 'Post ID is missing' },
      { status: 400 }
    );
  }

  try {
    const post = await UserPostModel.findById(postId).populate({
      path: 'author',
      select: 'name imageUrl role',
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
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

/**
 * DELETE handler to delete a user post by ID.
 */
export async function DELETE(req: MyRequest): Promise<NextResponse> {
  await connectDB();
  authenticateJWT(req);

  // Extract the postId from the URL
  const postId = req.nextUrl.pathname.split('/').pop();

  // Validate the postId
  if (!postId) {
    return NextResponse.json(
      { success: false, message: 'Post ID is missing' },
      { status: 400 }
    );
  }

  try {
    const deletedPost = await UserPostModel.findByIdAndRemove(postId);

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
    });
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
