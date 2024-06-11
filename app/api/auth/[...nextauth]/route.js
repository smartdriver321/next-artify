import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from '@mongodb/database'
import User from '@models/User'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async session({ sesion }) {
      const sessionUser = await User.findOne({ email: session.user.email })

      session.user.id = sessionUser._id.toString()
      return session
    },

    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        try {
          await connectToDB()

          /** Check if the user exist */
          let user = await User.findOne({ email: profile.email })

          if (!user) {
            user = await User.create({
              email: profile.email,
              username: profile.name,
              profileImagePath: profile.picture,
              wishlist: [],
              cart: [],
              order: [],
              work: [],
            })
          }

          return user
        } catch (error) {
          console.log('Error checking if user exists: ', err.message)
        }
      }
    },
  },
})

export { handler as GET, handler as POST }
