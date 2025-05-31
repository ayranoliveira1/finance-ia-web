'use server'

import { revalidatePath } from 'next/cache'

export const deleteTransaction = async (
  transactionId: string,
  accessToken: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/${transactionId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to create transaction')
  }

  revalidatePath('/admin/transactions')
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/subscription')

  return 'success'
}
