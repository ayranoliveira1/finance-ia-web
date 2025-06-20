'use server'

interface VerifyCodeType {
  email: string
  code: string
}

export const verifyCode = async ({ email, code }: VerifyCodeType) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
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
    message: 'Email de verificação enviado com sucesso.',
    statusCode: res.status,
  }
}
