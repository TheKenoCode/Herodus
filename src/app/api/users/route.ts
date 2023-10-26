// External and third-party imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

// Internal imports and utilities
import connectDB from '@/lib/utils/connectDB';
import { UserModel } from '@/lib/models/User';

// Configuration
const JWT_SECRET = process.env.JWT_SECRET; // It's safer to keep the secret in .env

/**
 * GET handler to fetch all users.
 */
export async function GET(): Promise<NextResponse> {
  await connectDB();

  try {
    const users = await UserModel.find({});

    if (!users) {
      return NextResponse.json({
        success: false,
        message: 'Users not available',
      });
    }
    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error); //eslint-disable-line
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    } else {
      console.error(error); //eslint-disable-line
      return NextResponse.json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
}

/**
 * POST handler to create a new user.
 */
export async function POST(req: NextRequest) {
  const {
    name,
    email,
    password,
    role,
    bio,
    location,
    userLink,
    playlistLink,
    YHaplogroup,
    MtHaplogroup,
    imageUrl,
    coverImage,
    following,
    followers,
    likedPosts,
  } = await req.json();
  await connectDB();

  // Hash the password before saving
  const saltRounds = 10;
  const hashedPassword = password
    ? await bcrypt.hash(password, saltRounds)
    : 'google';

  // Create the user
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
    bio,
    location,
    userLink,
    playlistLink: '27Zm1P410dPfedsdoO9fqm',
    YHaplogroup,
    MtHaplogroup,
    imageUrl,
    coverImage,
    following,
    followers,
    likedPosts,
  });

  // Generate JWT token for user
  const token = jwt.sign({ userId: user._id }, JWT_SECRET!, {
    expiresIn: '1h',
  });

  return NextResponse.json(
    { message: 'User Created', token: token },
    { status: 201 },
  );
}
