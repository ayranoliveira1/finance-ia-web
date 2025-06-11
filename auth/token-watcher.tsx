'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'

export function TokenWatcher() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated' && session?.error) {
      console.warn('Refresh token expirado. Fazendo signOut...')
      signOut({ callbackUrl: '/login' })
    }
  }, [session, status])

  return null
}
