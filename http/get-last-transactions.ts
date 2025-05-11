'use server'

export const getLastTransactions = async (
  accessToken: string,
  month: string,
  year: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/last/?month=${month}&year=${year}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch last transactions data')
  }

  return response.json()
}
