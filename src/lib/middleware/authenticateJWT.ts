// --- External Library Imports ---
import jwt from 'jsonwebtoken'

// --- Next.js Imports ---
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key'

/**
 * Authenticates a JWT token. If valid, it attaches the user to the request.
 * If not valid or missing, it throws an error.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The Next.js response object.
 */
export const authenticateJWT = async (
  req: NextRequest,
): Promise<NextResponse> => {
  const authHeader = req.headers.get('authtoken')

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      const user = jwt.verify(token, JWT_SECRET) as any
      req.user = user
    } catch (err) {
      console.error('Verification error:', err)
      throw new Error('Token not valid')
    }
  } else {
    throw new Error('Authorization header must be provided')
  }
}
