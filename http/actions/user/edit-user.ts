'use server'

interface EditUserType {
  name?: string
  email?: string
  currentPassword?: string
  newPassword?: string
}
export const editUser = async (data: EditUserType, accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    return response.json()
  }

  return 'success'
}
