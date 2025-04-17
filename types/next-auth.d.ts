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
    accessToken?: string
    refreshToken?: string
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
    user: {
      id: string
      name: string
      email: string
      role: UserRole
      subscriptionPlan: SubscriptionPlan
    }
    error?: string
  }
}
