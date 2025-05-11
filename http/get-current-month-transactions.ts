'use server'

export const getCurrentMonthTransactions = async (accessToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/current-month/count`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch current month transactions data')
  }

  return response.json()
}
