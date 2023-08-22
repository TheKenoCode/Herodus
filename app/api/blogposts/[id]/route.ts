// External and third-party imports
import type { NextApiRequest, NextApiResponse } from 'next'

// Internal imports and utilities
import connectDB from '../../../../utils/connectDB'
import { BlogPostModel } from '../../../../models'

/**
 * API handler to fetch a specific blog post by its ID.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Only handle GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method not allowed' })
    return
  }

  // Connect to the database
  await connectDB()

  try {
    // Retrieve the postId from the request URL
    const postId = req.query.id // This approach gets the dynamic route's parameter

    if (!postId) {
      res.status(400).json({ success: false, message: 'Post ID is required' })
      return
    }

    // Find the post by its ID
    const post = await BlogPostModel.findById(postId)

    // If the post does not exist, return a 404 status
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' })
      return
    }

    // Return the post data
    res.status(200).json(post)
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ success: false, message: error.message })
  }
}
