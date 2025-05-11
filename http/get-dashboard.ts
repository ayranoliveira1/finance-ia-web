'use server'

export const getDashboard = async (
  accessToken: string,
  month: string,
  year: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/?month=${month}&year=${year}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data')
  }

  return response.json()
}
