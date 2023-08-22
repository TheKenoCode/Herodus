// app/api/users/login.ts

// --- Third-party imports ---
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// --- Relative imports ---
import { UserModel } from '../../../../models/User'
import connectDB from '../../../../utils/connectDB'

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key'

/**
 * Handle POST requests for user login.
 * @param req - The request object.
 * @returns NextResponse - The response object.
 */
export async function POST(req: NextApiRequest): Promise<NextResponse> {
  const { email, password } = await req.json()

  await connectDB()

  // Try to find the user with the provided email
  const user = await UserModel.findOne({ email })

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Invalid email or password.' },
      { status: 401 }
    )
  }

  // Verify if the provided password matches the hashed password in the database
  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return NextResponse.json(
      { success: false, message: 'Invalid email or password.' },
      { status: 401 }
    )
  }

  // Generate a JWT token for the user
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' })

  // Prepare the user response excluding the password and other sensitive fields
  const userResponse = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }

  return NextResponse.json({
    success: true,
    message: 'Logged in!',
    token: token,
    user: userResponse,
  })
}
