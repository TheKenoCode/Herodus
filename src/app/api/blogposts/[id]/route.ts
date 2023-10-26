// External and third-party imports
import { NextRequest, NextResponse } from 'next/server';

// Internal imports and utilities
import connectDB from '@/lib/utils/connectDB';
import { BlogPostModel } from '@/lib/models/BlogPost';

/**
 * API handler to fetch a specific blog post by its ID.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Connect to the database
  await connectDB();

  try {
    // Retrieve the postId from the request URL
    const postId = request.nextUrl.pathname.split('/').pop(); // This approach gets the dynamic route's parameter

    if (!postId) {
      return NextResponse.json({
        success: false,
        message: 'Post ID is required',
      });
    }

    // Find the post by its ID
    const post = await BlogPostModel.findById(postId);
    // If the post does not exist, return a 404 status
    if (!post) {
      return NextResponse.json({
        success: false,
        message: 'Post not found',
      });
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
