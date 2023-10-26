// External and third-party imports
import cloudinary from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Internal imports and utilities
import connectDB from '@/lib/utils/connectDB';
import { authenticateJWT } from '@/lib/middleware/authenticateJWT';
import { UserModel } from '@/lib/models/User';
import { UserPostModel } from '@/lib/models/UserPosts';

export const dynamic = 'force-dynamic';
interface MyRequest extends NextRequest {
  user: {
    userId: string;
  };
}
interface BlobLike {
  arrayBuffer(): Promise<ArrayBuffer>;
  type: string;
  size: number;
}

cloudinary.v2.config({
  cloud_name: 'dso1bwkac',
  api_key: '455938576159633',
  api_secret: 'KHu3B7qrtymOzlFqB14CvsZm-50',
});

/**
 * GET handler to fetch all posts.
 */
export async function GET(): Promise<NextResponse> {
  await connectDB();

  try {
    const posts = await UserPostModel.find({}).populate('author');
    if (!posts) {
      return NextResponse.json({
        success: false,
        message: 'No posts available',
      });
    } // This will populate the author's name and email for each post
    return NextResponse.json(posts);
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
 * POST handler to create a new post.
 */
export async function POST(req: MyRequest): Promise<NextResponse> {
  try {
    authenticateJWT(req);

    await connectDB();

    const formData = await req.formData();
    console.log(formData); // eslint-disable-line

    const content = formData.get('content');
    const { user } = req;
    const file = formData.get('image') as BlobLike;
    console.log(file); // eslint-disable-line

    let imageUrl;
    if (file && typeof file === 'object' && file.type && file.size >= 0) {
      // Assume it's a Blob-like object if it has type and size properties
      const buffer = Buffer.from(await file.arrayBuffer());

      // Convert buffer to data URL
      const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
      const uploadResult = await cloudinary.v2.uploader.upload(dataUrl, {
        folder: '/herodus/userPostPhotos',
      });
      console.log(uploadResult.secure_url); // eslint-disable-line
      imageUrl = uploadResult.secure_url;
    } else {
      console.error('file is not a Blob or File:', file); //eslint-disable-line
    }

    const userFromDb = await UserModel.findOne({ _id: user.userId });
    if (!userFromDb) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      });
    }

    // Create the post with the imageUrl
    const post = await UserPostModel.create({
      content,
      author: userFromDb,
      imageUrl: imageUrl, // Storing the image URL
    });

    return NextResponse.json(
      { message: 'Post Created', postId: post._id },
      { status: 201 },
    );
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
