import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'
import { UserModel } from '@/lib/models/User'

// This will handle both follow and unfollow based on a property in the request body

export async function POST(req: NextApiRequest): Promise<NextResponse> {
  await connectDB()

  const userId = req.query.id // Extract from URL parameter
  const { targetUserId, action } = await req.json() // action can be 'follow' or 'unfollow'

  const user = await UserModel.findById(userId)
  const targetUser = await UserModel.findById(targetUserId)

  if (!user || !targetUser) {
    return NextResponse.json({ success: false, message: 'User(s) not found' })
  }

  if (action === 'follow') {
    if (user.following.includes(targetUserId)) {
      return NextResponse.json({
        success: false,
        message: 'Already following this user',
      })
    }
    user.following.push(targetUserId)
    targetUser.followers.push(userId)
  } else if (action === 'unfollow') {
    user.following = user.following.filter((id) => id !== targetUserId)
    targetUser.followers = targetUser.followers.filter((id) => id !== userId)
  } else {
    return NextResponse.json({ success: false, message: 'Invalid action' })
  }

  await user.save()
  await targetUser.save()

  return NextResponse.json({
    success: true,
    message: `${
      action.charAt(0).toUpperCase() + action.slice(1)
    }ed successfully`,
  })
}
