'use server'

interface RegisterType {
  name: string
  email: string
  password: string
}

interface RegisterErrorResponse {
  message: string
  error: string
  statusCode: number
}

interface RegisterSuccessResponse {
  message: string
  statusCode: number
}

export const Register = async (
  data: RegisterType,
): Promise<RegisterErrorResponse | RegisterSuccessResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const responseData = await res.json()

    return {
      message: responseData.message || 'Erro desconhecido',
      error: responseData.error || 'Unknown Error',
      statusCode: res.status,
    }
  }

  return {
    message: 'Usuário cadastrado com sucesso.',
    statusCode: res.status,
  }
}
