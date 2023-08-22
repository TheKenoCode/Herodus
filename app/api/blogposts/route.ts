// External and third-party imports
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Internal imports and utilities
import connectDB from '../../../utils/connectDB'
import { authenticateJWT } from '../../../middleware/authenticateJWT'
import { BlogPostModel, UserModel } from '../../../models'
export const dynamic = 'force-dynamic'

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key'

// Type definitions
interface CreatePostBody {
  title: string
  content: string
  author: string
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor',
  // Add other roles as needed
}

// Handlers

/**
 * GET handler to fetch all blog posts.
 */
export async function GET(req: NextApiRequest): Promise<NextResponse> {
  await connectDB()

  try {
    const posts = await BlogPostModel.find().populate('author')
    return NextResponse.json(posts.map((post) => post.toObject()))
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}

/**
 * POST handler to create a new blog post.
 * Only admins are allowed to create posts.
 */
export async function POST(req: NextApiRequest): Promise<NextResponse> {
  try {
    // Authenticate the user first
    authenticateJWT(req, NextResponse)

    await connectDB()

    const { title, content } = await req.json()
    const { user } = req
    console.log('User from JWT:', user)

    const userFromDb = await UserModel.findOne({ _id: user.userId })
    if (!userFromDb) {
      throw new Error('User not found')
    }

    // Ensure the user has the admin role
    if (userFromDb.role !== UserRole.ADMIN) {
      throw new Error('Only admins can create posts')
    }

    console.log('userFromDB:', userFromDb)
    const post = await BlogPostModel.create({
      title,
      content,
      author: userFromDb,
    })

    console.log('Created Post:', post)
    return NextResponse.json({ message: 'Post Created', post: post })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ success: false, message: error.message })
  }
}
