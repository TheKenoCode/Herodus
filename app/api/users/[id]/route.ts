// External and third-party imports
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

// Internal imports and utilities
import connectDB from '../../../../utils/connectDB'
import { UserModel } from '../../../../models/User'

/**
 * GET handler to retrieve a user by ID.
 */
export async function GET(req: NextApiRequest): Promise<NextResponse> {
  await connectDB()

  // Extract the userId from the URL
  const userId = req.nextUrl.pathname.split('/').pop()

  // Validate the userId
  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'User ID is missing' },
      { status: 400 }
    )
  }

  try {
    const user = await UserModel.findById(userId)

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}
