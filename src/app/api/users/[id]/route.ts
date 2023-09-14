// External and third-party imports
import { UserModel } from '@/lib/models/User'
import { NextResponse, NextRequest } from 'next/server'
// Internal imports and utilities
import connectDB from '@/lib/connectDB'
import jwt from 'jsonwebtoken'

// Additional imports for image uploading
import multer from 'multer'
import { authenticateJWT } from '@/lib/middleware/authenticateJWT'
import cloudinary from 'cloudinary'
export const dynamic = 'force-dynamic'
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key'
// Cloudinary configuration (should be moved to a common place if used across multiple routes)
cloudinary.v2.config({
  cloud_name: 'dso1bwkac',
  api_key: '455938576159633',
  api_secret: 'KHu3B7qrtymOzlFqB14CvsZm-50',
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/**
 * GET handler to retrieve a user by ID.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  await connectDB()

  // Extract the userId from the URL
  const userId = req.nextUrl.pathname.split('/').pop()

  // Validate the userId
  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'User ID is missing' },
      { status: 400 },
    )
  }

  try {
    const user = await UserModel.findById(userId)

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}

/**
 * PUT handler to update a user by ID.
 */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    authenticateJWT(req, NextRequest)

    await connectDB()
    // await uploadSingle('image')(req, {}, async () => {})
    const formData = await req.formData()
    const name = formData.get('name')
    const bio = formData.get('bio')
    const coverImage = formData.get('coverImage')
    const avatarImage = formData.get('avatarImage')
    const location = formData.get('location')
    const userLink = formData.get('userLink')
    const YHaplogroup = formData.get('YHaplogroup')
    const MtHaplogroup = formData.get('MtHaplogroup')
    let avatarImageUrl = ''
    let coverImageUrl = ''
    const { user } = req

    if (avatarImage) {
      // Convert Blob to Buffer
      const buffer = Buffer.from(await avatarImage.arrayBuffer())
      // Convert buffer to data URL
      const dataUrl = `data:${avatarImage.type};base64,${buffer.toString(
        'base64',
      )}`
      avatarImageUrl = await cloudinary.v2.uploader.upload(dataUrl, {
        folder: '/herodus/profilePictures',
      })
      console.log(avatarImageUrl.secure_url)
    }
    if (coverImage) {
      // Convert Blob to Buffer
      const buffer = Buffer.from(await coverImage.arrayBuffer())
      // Convert buffer to data URL
      const dataUrl = `data:${coverImage.type};base64,${buffer.toString(
        'base64',
      )}`
      coverImageUrl = await cloudinary.v2.uploader.upload(dataUrl, {
        folder: '/herodus/coverPictures',
      })
      console.log(coverImageUrl.secure_url)
    }

    const userFromDb = await UserModel.findOne({ _id: user.userId })
    if (!userFromDb) {
      throw new Error('User not found')
    }
    const userInfo = {
      name: name || '',
      bio: bio || '',
      imageUrl: avatarImageUrl.secure_url || userFromDb.imageUrl,
      coverImage: coverImageUrl.secure_url || userFromDb.coverImage,
      location: location || '',
      userLink: userLink || '',
      YHaplogroup: YHaplogroup || '',
      MtHaplogroup: MtHaplogroup || '',
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user.userId,
      userInfo,
      {
        new: true,
      },
    )

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      )
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}

/**
 * DELETE handler to delete a user by ID.
 */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectDB()

  // Extract the userId from the URL
  const userId = req.nextUrl.pathname.split('/').pop()

  // Validate the userId
  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'User ID is missing' },
      { status: 400 },
    )
  }

  try {
    const deletedUser = await UserModel.findByIdAndRemove(userId)

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}
