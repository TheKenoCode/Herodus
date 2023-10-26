// External and third-party imports

import { NextRequest, NextResponse } from 'next/server';

// Internal imports and utilities
import connectDB from '@/lib/utils/connectDB';
import { authenticateJWT } from '@/lib/middleware/authenticateJWT';
import { UserModel } from '@/lib/models/User';
import bcrypt from 'bcrypt';

export const dynamic = 'force-dynamic';

interface MyRequest extends NextRequest {
  user: {
    userId: string;
  };
}

export async function PUT(req: MyRequest): Promise<NextResponse> {
  console.log('api request');

  try {
    authenticateJWT(req);

    await connectDB();

    const { email, password, emailPassword } = await req.json();
    const { user } = req;
    console.log(email);

    const userFromDb = await UserModel.findOne({ _id: user.userId });
    if (!userFromDb) {
      throw new Error('User not found');
    }
    console.log(user.userId);
    // If email is being updated, validate the current password
    if (email && email !== userFromDb.email) {
      const isValidPassword = await bcrypt.compare(
        emailPassword,
        userFromDb.password,
      );
      if (!emailPassword || !isValidPassword) {
        return NextResponse.json({
          success: false,
          message: 'Incorrect password for email update.',
        });
      }

      // Check if the new email is already in use by another user.
      const existingUserWithNewEmail = await UserModel.findOne({ email });
      if (existingUserWithNewEmail) {
        return NextResponse.json({
          success: false,
          message: 'The email address is already in use by another user.',
        });
      }
    }
    // Update the necessary fields
    if (email) {
      const updatedEmail = { email: email };
      await UserModel.findByIdAndUpdate(user.userId, updatedEmail, {
        new: true,
      });
      return NextResponse.json({
        success: true,
        message: 'User email updated successfully.',
      });
    }
    if (password) {
      const saltRounds = 10; // You can adjust this based on your security requirements
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const updatedPassword = { password: hashedPassword };
      await UserModel.findByIdAndUpdate(user.userId, updatedPassword, {
        new: true,
      });
      return NextResponse.json({
        success: true,
        message: 'User password updated successfully.',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully.',
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
