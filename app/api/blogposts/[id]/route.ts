// External and third-party imports
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

// Internal imports and utilities
import connectDB from '../../../../utils/connectDB'
import { BlogPostModel } from '../../../../models/BlogPost'

/**
 * API handler to fetch a specific blog post by its ID.
 */
export async function GET(request: request): Promise<NextResponse> {
  // Connect to the database
  await connectDB()

  try {
    // Retrieve the postId from the request URL
    const postId = request.nextUrl.pathname.split('/').pop() // This approach gets the dynamic route's parameter

    if (!postId) {
      return NextResponse.json({
        success: false,
        message: 'Post ID is required',
      })
      return
    }

    // Find the post by its ID
    const post = await BlogPostModel.findById(postId)
    // If the post does not exist, return a 404 status
    if (!post) {
      return NextResponse.json({
        success: false,
        message: 'Post not found',
      })
    }

    // Return the post data
    return NextResponse.json(post)
  } catch (error) {
    // Handle any unexpected errors
    return NextResponse.json({ success: false, message: error.message })
  }
}
