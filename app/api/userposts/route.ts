// External and third-party imports
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../../models/User'

// Internal imports and utilities
import connectDB from '../../../utils/connectDB'
import { UserPostModel } from '../../../models/UserPosts'
import { authenticateJWT } from '../../../middleware/authenticateJWT'
export const dynamic = 'force-dynamic'
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key'

interface CreatePostBody {
  content: string
}

/**
 * GET handler to fetch all posts.
 */
export async function GET(req: NextApiRequest): Promise<NextResponse> {
  await connectDB()

  try {
    const posts = await UserPostModel.find({}).populate('author') // This will populate the author's name and email for each post
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}

/**
 * POST handler to create a new post.
 */
export async function POST(request: NextApiRequest): Promise<NextResponse> {
  try {
    authenticateJWT(request, NextResponse)

    await connectDB()
    const { content } = await request.json()
    const { user } = request
    const userFromDb = await UserModel.findOne({ _id: user.userId })
    if (!userFromDb) {
      throw new Error('User not found')
    }
    // Create the post
    const post = await UserPostModel.create({
      content,
      author: userFromDb,
    })

    return NextResponse.json(
      { message: 'Post Created', postId: post._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ success: false, message: error.message })
  }
}
