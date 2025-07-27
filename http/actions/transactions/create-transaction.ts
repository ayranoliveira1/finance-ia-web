'use server'

import { FormTransactionType } from '@/components/upsert-transaction-dialog'
import { revalidatePath } from 'next/cache'

export const createTransaction = async (
  data: FormTransactionType,
  accessToken: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to create transaction')
  }

  revalidatePath('/admin/transactions')
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/subscription')

  return response.json()
}
