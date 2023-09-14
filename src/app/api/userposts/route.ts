// External and third-party imports
import type { NextApiRequest } from 'next'
import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { UserModel } from '@/lib/models/User'
import nextConnect from 'next-connect'
import multer from 'multer'
// Internal imports and utilities
import connectDB from '@/lib/connectDB'
import { UserPostModel } from '@/lib/models/UserPosts'
import { authenticateJWT } from '@/lib/middleware/authenticateJWT'
import cloudinary from 'cloudinary'

export const dynamic = 'force-dynamic'
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key'

cloudinary.v2.config({
  cloud_name: 'dso1bwkac',
  api_key: '455938576159633',
  api_secret: 'KHu3B7qrtymOzlFqB14CvsZm-50',
})
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

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const uploadSingle = (fieldName: string) => {
  return (request: any, response: any, next: any) => {
    upload.single(fieldName)(request, response, (err) => {
      if (err) {
        response.status(500).json({ error: err.message })
        return
      }
      next()
    })
  }
}
/**
 * POST handler to create a new post.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    authenticateJWT(request, NextRequest)

    await connectDB()
    await uploadSingle('image')(request, {}, async () => {})

    // const { content } = await request.json()
    const formData = await request.formData()
    console.log(formData)

    const content = formData.get('content')
    const { user } = request
    const file = formData.get('image')

    console.log(file)
    let imageUrl = ''
    if (file) {
      // Convert Blob to Buffer
      const buffer = Buffer.from(await file.arrayBuffer())

      // Convert buffer to data URL
      const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`
      imageUrl = await cloudinary.v2.uploader.upload(dataUrl, {
        folder: '/herodus/userPostPhotos',
      })
      console.log(imageUrl.secure_url)
    }

    const userFromDb = await UserModel.findOne({ _id: user.userId })
    if (!userFromDb) {
      throw new Error('User not found')
    }

    // Create the post with the imageUrl
    const post = await UserPostModel.create({
      content,
      author: userFromDb,
      imageUrl: imageUrl.secure_url, // Storing the image URL
    })

    return NextResponse.json(
      { message: 'Post Created', postId: post._id },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ success: false, message: error.message })
  }
}
