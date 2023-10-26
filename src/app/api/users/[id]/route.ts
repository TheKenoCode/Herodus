// External and third-party imports
import cloudinary from 'cloudinary';
// Additional imports for image uploading
import { NextRequest, NextResponse } from 'next/server';

// Internal imports and utilities
import connectDB from '@/lib/utils/connectDB';
import { authenticateJWT } from '@/lib/middleware/authenticateJWT';
import { UserModel } from '@/lib/models/User';
export const dynamic = 'force-dynamic';
// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface MyRequest extends NextRequest {
  user: {
    userId: string;
  };
}
interface BlobLike {
  arrayBuffer(): Promise<ArrayBuffer>;
  type: string;
  size: number;
}
/**
 * GET handler to retrieve a user by ID.
 */
export async function GET(req: MyRequest): Promise<NextResponse> {
  await connectDB();

  // Extract the userId from the URL
  const userId = req.nextUrl.pathname.split('/').pop();

  // Validate the userId
  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'User ID is missing' },
      { status: 400 },
    );
  }

  try {
    const user = await UserModel.findById(userId).populate({
      path: 'likedPosts',
      populate: {
        path: 'author',
        select: 'name imageUrl role',
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
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
 * PUT handler to update a user by ID.
 */
export async function PUT(req: MyRequest): Promise<NextResponse> {
  try {
    authenticateJWT(req);

    await connectDB();

    const formData = await req.formData();
    const name = formData.get('name');
    const bio = formData.get('bio');
    const coverImage = formData.get('coverImage') as BlobLike;
    const avatarImage = formData.get('avatarImage') as BlobLike;
    const location = formData.get('location');
    const userLink = formData.get('userLink');
    const playlistLink = formData.get('playlistLink');
    const YHaplogroup = formData.get('YHaplogroup');
    const MtHaplogroup = formData.get('MtHaplogroup');
    let avatarImageUrl = '';
    let coverImageUrl = '';
    const { user } = req;
    console.log(playlistLink);
    if (
      avatarImage &&
      typeof avatarImage === 'object' &&
      avatarImage.type &&
      avatarImage.size >= 0
    ) {
      // Convert Blob to Buffer
      const buffer = Buffer.from(await avatarImage.arrayBuffer());
      // Convert buffer to data URL
      const dataUrl = `data:${avatarImage.type};base64,${buffer.toString(
        'base64',
      )}`;
      const uploadResult = await cloudinary.v2.uploader.upload(dataUrl, {
        folder: '/herodus/profilePictures',
      });
      console.log(uploadResult.secure_url); // eslint-disable-line
      avatarImageUrl = uploadResult.secure_url;
    } else {
      console.error('file is not a Blob or File:', avatarImage); // eslint-disable-line
    }

    if (
      coverImage &&
      typeof coverImage === 'object' &&
      coverImage.type &&
      coverImage.size >= 0
    ) {
      // Convert Blob to Buffer
      const buffer = Buffer.from(await coverImage.arrayBuffer());
      // Convert buffer to data URL
      const dataUrl = `data:${coverImage.type};base64,${buffer.toString(
        'base64',
      )}`;
      const uploadResult = await cloudinary.v2.uploader.upload(dataUrl, {
        folder: '/herodus/coverPictures',
      });
      console.log(uploadResult.secure_url); // eslint-disable-line
      coverImageUrl = uploadResult.secure_url;
    } else {
      console.error('file is not a Blob or File:', coverImage); // eslint-disable-line
    }

    const userFromDb = await UserModel.findOne({ _id: user.userId });
    if (!userFromDb) {
      throw new Error('User not found');
    }
    const userInfo = {
      name: name || '',
      bio: bio || '',
      imageUrl: avatarImageUrl || userFromDb.imageUrl,
      coverImage: coverImageUrl || userFromDb.coverImage,
      location: location || '',
      userLink: userLink || '',
      playlistLink: playlistLink || '',
      YHaplogroup: YHaplogroup || '',
      MtHaplogroup: MtHaplogroup || '',
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      user.userId,
      userInfo,
      {
        new: true,
      },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedUser);
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
 * DELETE handler to delete a user by ID.
 */
export async function DELETE(req: MyRequest): Promise<NextResponse> {
  await connectDB();

  try {
    authenticateJWT(req);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }, // Unauthorized status code
    );
  }

  // Extract the userId from the URL
  const userId = req.nextUrl.pathname.split('/').pop();

  // Validate the userId
  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'User ID is missing' },
      { status: 400 },
    );
  }

  try {
    const deletedUser = await UserModel.findByIdAndRemove(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
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
