// External and third-party imports
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { getApiUrl } from '../../../../utils/API_URL'
const API_URL = getApiUrl()

// Internal imports and utilities
import connectDB from '../../../../utils/connectDB'
import { UserModel } from '../../../../models'

// Configuration options for NextAuth
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    /**
     * Handle session callback to attach custom user properties.
     */
    async session({ session }) {
      const email = session.user.email // Extract email from session
      const sessionUser = await UserModel.findOne({ email })

      session.user._id = sessionUser._id
      session.user.name = sessionUser.name
      return session
    },

    /**
     * Handle sign-in logic, especially for Google provider.
     */
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        const { name, email } = user

        try {
          await connectDB()

          const userExists = await UserModel.findOne({ email })

          if (!userExists) {
            const res = await fetch(`${API_URL}/api/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                email,
              }),
            })

            if (res.ok) {
              return user
            }
          }
        } catch (error) {
          console.error('Error during sign-in:', error)
        }
      }
      return user
    },
  },
}

// NextAuth handler
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
