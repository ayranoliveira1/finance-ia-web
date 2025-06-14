import { DefaultSession, DefaultUser } from 'next-auth'
declare enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

declare enum SubscriptionPlan {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string
    name: string
    email: string
    role: UserRole
    subscriptionPlan: SubscriptionPlan
    createdAt: Date
    accessToken?: string
    refreshToken?: string
    sessionId?: string
  }

  interface Session extends DefaultSession {
    user: User
    accessToken: string
    error?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken?: string
    sessionId?: string
    user: {
      id: string
      name: string
      email: string
      role: UserRole
      subscriptionPlan: SubscriptionPlan
      createdAt: Date
    }
    error?: string
    expiresAt?: number
  }
}
