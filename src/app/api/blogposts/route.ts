// External and third-party imports
import { NextRequest, NextResponse } from 'next/server';

// Internal imports and utilities
import connectDB from '@/lib/utils/connectDB';
import { authenticateJWT } from '@/lib/middleware/authenticateJWT';
import { BlogPostModel } from '@/lib/models/BlogPost';
import { UserModel } from '@/lib/models/User';

export const dynamic = 'force-dynamic';
interface MyRequest extends NextRequest {
  user: {
    userId: string;
  };
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor',
}
// Handlers

/**
 * GET handler to fetch all blog posts.
 */
export async function GET(): Promise<NextResponse> {
  await connectDB();
  try {
    const posts = await BlogPostModel.find({}).populate('author').exec();
    if (!posts) {
      return NextResponse.json({
        success: false,
        message: 'no posts available',
      });
    }
    return NextResponse.json(posts.map((post) => post.toObject()));
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
 * POST handler to create a new blog post.
 * Only admins are allowed to create posts.
 */
export async function POST(req: MyRequest): Promise<NextResponse> {
  try {
    // Authenticate the user first
    authenticateJWT(req);

    await connectDB();

    const { title, content } = await req.json();
    const { user } = req;
    console.log('User from JWT:', user); // eslint-disable-line

    const userFromDb = await UserModel.findOne({ _id: user.userId });
    if (!userFromDb) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      });
    }

    // Ensure the user has the admin role
    if (userFromDb.role !== UserRole.ADMIN) {
      return NextResponse.json({
        success: false,
        message: 'Only ADMINS can make blog posts',
      });
    }

    console.log('userFromDB:', userFromDb); // eslint-disable-line
    const post = await BlogPostModel.create({
      title,
      content,
      author: userFromDb,
    });

    console.log('Created Post:', post); // eslint-disable-line
    return NextResponse.json({ message: 'Post Created', post: post });
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
