'use server'

import { getServerSession } from 'next-auth'
import { generateAiReportSchema, GenerateAiReportType } from './sxhema'
import { authOptions } from '@/auth/auth.config'

export const generateAiReport = async ({
  year,
  month,
}: GenerateAiReportType) => {
  generateAiReportSchema.parse({ month, year })

  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('User not authenticated')
  }

  const hasPremiumPlan = session.user.subscriptionPlan === 'PREMIUM'

  if (!hasPremiumPlan) {
    throw new Error('User does not have a premium plan')
  }

  const accessToken = session.accessToken

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ai-report/?month=${month}&year=${year}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  const data = await response.text()

  if (!response.ok) {
    return data
  }

  return data
}
