'use server'

import { authOptions } from '@/auth/auth.config'
import { getServerSession } from 'next-auth'

export const cancelPlan = async () => {
  const session = await getServerSession(authOptions)

  const accessToken = session?.accessToken

  if (!accessToken) {
    throw new Error('Unauthorized')
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/subscription/cancel`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to create transaction')
  }

  return {
    message: 'Assinatura cancelada com sucesso.',
  }
}
