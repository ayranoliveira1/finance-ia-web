'use server'

interface ResetPasswordRequest {
  newPassword: string
  confirmNewPassword: string
  code: string
}

export const resetPassword = async (data: ResetPasswordRequest) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password?code=${data.code}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      }),
    },
  )

  console.log('Response from reset password:', await res.json())

  if (!res.ok) {
    const responseData = await res.json()

    return {
      message: responseData.message || 'Erro desconhecido',
      error: responseData.error || 'Unknown Error',
      statusCode: res.status,
    }
  }

  return {
    message: 'Redefinição de senha enviada com sucesso.',
    statusCode: res.status,
  }
}
