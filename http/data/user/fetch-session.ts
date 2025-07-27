'use client'

import { useAuth } from '@/auth/useAuth'
import { Session } from '@/types/session'
import { useQuery } from '@tanstack/react-query'

export function fetchSession() {
  const { accessToken } = useAuth()

  const { data: sessionData } = useQuery<Session>({
    queryKey: ['ip'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sessions/recent`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken!}`,
          },
        },
      )

      const result = await response.json()

      return result.session
    },
  })

  return sessionData
}
