// External and third-party imports
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Internal imports and utilities
import connectDB from '../../../utils/connectDB'
import { UserModel } from '../../../models/User'
import { authenticateToken } from '../../../utils/authMiddleware'
import { revalidatePath } from 'next/cache'

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key' // It's safer to keep the secret in .env

// Define user roles
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

interface CreateUserBody {
  name: string
  email: string
  password: string
}
async function addPostsFieldToExistingUsers() {
  // Connect to the database
  await connectDB()

  // Update all users that don't have the UserPosts field and set it to an empty array
  await UserModel.updateMany(
    { UserPosts: { $exists: false } }, // Condition to find users without the UserPosts field
    { $set: { UserPosts: [] } } // Operation to add the UserPosts field and set it to an empty array
  )

  console.log('Updated users successfully!')
}
/**
 * GET handler to fetch all users.
 */
export async function GET(req: NextApiRequest): Promise<NextResponse> {
  await connectDB()

  try {
    const users = await UserModel.find({}).populate('UserPosts')

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message })
  }
}

/**
 * POST handler to create a new user.
 */
export async function POST(request) {
  const { name, email, password, role } = await request.json()
  await connectDB()

  // Hash the password before saving
  const saltRounds = 10
  const hashedPassword = password
    ? await bcrypt.hash(password, saltRounds)
    : 'google'

  // Create the user
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  })

  // Generate JWT token for user
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })

  return NextResponse.json(
    { message: 'User Created', token: token },
    { status: 201 }
  )
}

// Note: I've commented out the role check since you had it commented out. If you intend to use it in the future, you might want to uncomment and adjust it accordingly.
