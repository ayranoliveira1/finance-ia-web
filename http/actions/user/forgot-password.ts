'use server'

export const forgotPassword = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mail/send-email-reset-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  )

  if (!res.ok) {
    const responseData = await res.json()

    return {
      message: responseData.message || 'Erro desconhecido',
      error: responseData.error || 'Unknown Error',
      statusCode: res.status,
    }
  }

  return {
    message: 'Email de redefinição de senha enviado com sucesso.',
    statusCode: res.status,
  }
}
