// --- External Library Imports ---
import jwt from 'jsonwebtoken';
// --- Next.js Imports ---
import { NextRequest } from 'next/server';

interface MyRequest extends NextRequest {
  user: {
    userId: string;
  };
}
// Constants
const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Authenticates a JWT token. If valid, it attaches the user to the request.
 * If not valid or missing, it throws an error.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<void>} - The Next.js response object.
 */
export const authenticateJWT = async (req: MyRequest): Promise<void> => {
  const authHeader = req.headers.get('authtoken');
  if (!authHeader) {
    throw new Error('Authorization header must be provided');
  } else if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const user = jwt.verify(token, JWT_SECRET) as { userId: string };
      req.user = user;
    } catch (err) {
      console.error('Verification error:', err); //eslint-disable-line
      throw new Error('Token not valid');
    }
  } else {
    throw new Error('Authorization header must be provided');
  }
};
