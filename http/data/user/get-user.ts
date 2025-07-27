'use server'

import { User } from 'next-auth'

export async function getUser(accessToken: string): Promise<User> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Authentication failed')
  }

  const data = await response.json()
  return data.user
}
