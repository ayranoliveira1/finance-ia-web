'use server'

import { revalidatePath } from 'next/cache'

export const paymentStripe = async (accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to create transaction')
  }

  revalidatePath('/admin/subscription')

  return response.json()
}
