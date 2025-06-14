'use server'

export async function refreshAccessToken(token: any) {
  try {
    if (!token.refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refresh_token=${token.refreshToken}; session_id=${token.sessionId}`,
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(
        'Refresh failed - Status:',
        response.status,
        'Response:',
        errorText,
      )
      throw new Error(errorText || 'Failed to refresh token')
    }

    console.log('refresh')

    const data = await response.json()
    const cookies = response.headers.get('set-cookie') as string

    const newRefreshToken = cookies.split(';')[0].split('=')[1]

    return {
      ...token,
      accessToken: data.token,
      accessTokenExpires: Date.now() + 7 * 60 * 1000,
      refreshToken: newRefreshToken,
      error: null,
    }
  } catch (error) {
    console.error('Refresh token error:', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}
