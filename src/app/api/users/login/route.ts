// app/api/users/login.ts

// --- Third-party imports ---
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/utils/connectDB';
// --- Relative imports ---
import { UserModel } from '@/lib/models/User';

// Constants
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Handle POST requests for user login.
 * @param req - The request object.
 * @returns NextResponse - The response object.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email, password } = await req.json();

  await connectDB();

  // Try to find the user with the provided email
  const user = await UserModel.findOne({ email });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: 'User with this email does not exist',
    });
  }

  // Verify if the provided password matches the hashed password in the database
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json({
      success: false,
      message: 'Invalid Password ',
    });
  }

  // Generate a JWT token for the user
  const token = jwt.sign({ userId: user._id }, JWT_SECRET!, {
    expiresIn: '30d',
  });
  console.log(user.playlistLink);
  // Prepare the user response excluding the password and other sensitive fields
  const userResponse = {
    _id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    followers: user.followers,
    following: user.following,
    bio: user.bio,
    playlistLink: user.playlistLink,
    imageUrl: user.imageUrl,
    YHaplogroup: user.YHaplogroup,
    MtHaplogroup: user.MtHaplogroup,
  };

  return NextResponse.json({
    success: true,
    message: 'Logged in!',
    token: token,
    user: userResponse,
  });
}
