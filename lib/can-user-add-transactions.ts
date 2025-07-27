import { authOptions } from '@/auth/auth.config'
import { getCurrentMonthTransactions } from '@/http/data/transactions/get-current-month-transactions'
import { getServerSession } from 'next-auth'

export const canUserAddTransaction = async () => {
  const session = await getServerSession(authOptions)

  const accessToken = session?.accessToken
  if (!accessToken) {
    throw new Error('Unauthorized')
  }
  const user = session?.user

  if (!user) {
    throw new Error('Unauthorized')
  }

  const userPlan = user.subscriptionPlan

  if (userPlan === 'PREMIUM') {
    return true
  }

  const currentMonthTransactions = await getCurrentMonthTransactions(
    accessToken!,
  )
  if (currentMonthTransactions.count >= 10) {
    return false
  }
  return true
}
