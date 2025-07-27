'use server'

export const deleteAccount = async (password: string, accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password }),
  })

  if (response.status !== 204) {
    return response.json()
  }

  return 'success'
}
