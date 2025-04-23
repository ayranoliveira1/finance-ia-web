'use server'

import { FormTransactionType } from '@/components/upsert-transaction-dialog'
import { revalidatePath } from 'next/cache'

export const EditTransaction = async (
  data: FormTransactionType,
  accessToken: string,
  transactionId: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/${transactionId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to update transaction')
  }

  revalidatePath('/admin/transactions')

  return 'success'
}
