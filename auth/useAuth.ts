// hooks/useAuth.ts
'use client'

import { useSession } from 'next-auth/react'

export const useAuth = () => {
  const { data: session, status, update } = useSession()

  return {
    user: session?.user,
    accessToken: session?.accessToken,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    updateSession: update,
  }
}
