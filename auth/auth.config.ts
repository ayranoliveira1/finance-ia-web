import NextAuth, { type NextAuthOptions, type User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
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

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role as User['role'],
            subscriptionPlan: data.user.subscriptionPlan,
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
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Login inicial
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            subscriptionPlan: user.subscriptionPlan,
          },
        }
      }

      if (token.refreshToken) {
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
      },
    },
  },
}

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    const cookies = response.headers.get('set-cookie') as string

    const newRefreshToken = cookies.split(';')[0].split('=')[1]

    return {
      ...token,
      accessToken: data.token,
      refreshToken: newRefreshToken,
      error: null,
    }
  } catch (error) {
    console.error('Refresh token error:', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth(authOptions)
