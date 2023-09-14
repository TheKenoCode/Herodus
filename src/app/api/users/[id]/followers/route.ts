import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'
import { UserModel } from '@/lib/models/User'

export async function GET(req: NextApiRequest): Promise<NextResponse> {
  await connectDB()

  const userId = req.nextUrl.pathname.split('/')[2] // Adjust this to get the correct userId

  try {
    const user = await UserModel.findById(userId).populate('followers')
    return NextResponse.json(user.followers)
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}
