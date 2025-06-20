import { getUser } from '@/http/get-user'
import { refreshAccessToken } from '@/http/refresh-access-token'
import NextAuth, { type NextAuthOptions, type User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

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
                'user-agent': req?.headers?.['user-agent'],
              },
              credentials: 'include',
            },
          )

          if (!response.ok) {
            const errorData = await response.json()

            ;(await cookies()).set('auth_error', errorData.message, {
              httpOnly: false,
              maxAge: 160,
              path: '/',
            })

            return null
          }

          const data = await response.json()
          const cookieHeader = response.headers.get('set-cookie')

          const refreshToken = cookieHeader
            ?.split(',')
            .find((c) => c.includes('refresh_token'))
            ?.split(';')[0]
            .split('=')[1]

          const sessionId = cookieHeader
            ?.split(',')
            .find((c) => c.includes('session_id'))
            ?.split(';')[0]
            .split('=')[1]

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
            sessionId: sessionId,
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
          sessionId: user.sessionId,
          accessTokenExpires: Date.now() + 7 * 60 * 1000,
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
        Date.now() > Number(token.accessTokenExpires) - 6 * 60 * 1000
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
        maxAge: 5 * 60 * 1000,
      },
    },
  },
}

export default NextAuth(authOptions)
