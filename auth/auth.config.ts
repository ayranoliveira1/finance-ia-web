import { getUser } from '@/http/get-user'
import { refreshAccessToken } from '@/http/refresh-access-token'
import NextAuth, { type NextAuthOptions, type User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        ip: {},
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: {
                'Content-Type': 'application/json',
                Cookie: req?.headers?.cookie || '',
                'user-agent': req?.headers?.['user-agent'],
              },
              credentials: 'include',
            },
          )

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Authentication failed')
          }

          const data = await response.json()
          const cookies = response.headers.get('set-cookie') as string

          const refreshToken = cookies.split(';')[0].split('=')[1]

          if (!data.token || !refreshToken) {
            throw new Error('Authentication data incomplete')
          }

          const dataUser = await getUser(data.token)

          return {
            id: dataUser.id,
            name: dataUser.name,
            email: dataUser.email,
            role: dataUser.role as User['role'],
            createdAt: dataUser.createdAt,
            subscriptionPlan: dataUser.subscriptionPlan,
            accessToken: data.token,
            refreshToken: refreshToken,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, account }) {
      if (trigger === 'update') {
        try {
          const updateUser = await getUser(token.accessToken)

          return {
            ...token,
            user: {
              ...token.user,
              ...updateUser,
            },
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          return token
        }
      }

      // Login inicial
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 20 * 60 * 1000,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            subscriptionPlan: user.subscriptionPlan,
            createdAt: user.createdAt,
          },
        }
      }

      if (
        token.accessTokenExpires &&
        Date.now() > Number(token.accessTokenExpires) - 5 * 60 * 1000
      ) {
        console.log('Token expirando, tentando refresh...')
        return await refreshAccessToken(token)
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.error = token.error
      return session
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 60 * 1000,
      },
    },
  },
}

export default NextAuth(authOptions)
