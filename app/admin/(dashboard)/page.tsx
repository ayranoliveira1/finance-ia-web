import { redirect } from 'next/navigation'
import { isMatch } from 'date-fns'
import { Suspense } from 'react'
import LastTransactionSkeleton from './components/skeleton/last-tranasaction-skeleton'
import Header from '@/components/header'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/auth.config'
import { getDashboard } from '@/http/get-dashboard'
import SummaryCards from './components/summary-cards'
import TransactionsPieChart from './components/transactions-pie-chart'
import ExpensePerCategory from './components/expenses-per-category'
import LastTransactions from './components/last-transactions'
import TimeSelect from './components/time-select'
import { canUserAddTransaction } from '@/lib/can-user-add-transactions'
import AiReportButton from './components/ai-report-button'

interface HomePros {
  searchParams: Promise<{ [key: string]: string }>
}

const Home = async ({ searchParams }: HomePros) => {
  const { year, month } = await searchParams
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const yearIsValid = !year || !isMatch(year, 'yyyy')
  const monthIsValid = !month || !isMatch(month, 'MM')

  if (yearIsValid && monthIsValid) {
    redirect(
      `/admin/?month=${String(new Date().getMonth() + 1).padStart(2, '0')}&year=${String(new Date().getFullYear()).padStart(4, '0')}`,
    )
  }

  const accessToken = session.accessToken

  const dashboard = await getDashboard(accessToken, month, year)

  const userCanAddTransaction = await canUserAddTransaction()

  const hasPremiumPlan = session.user.subscriptionPlan === 'PREMIUM'

  if (!dashboard) {
    redirect('/error?expired=1')
  }

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-6 lg:overflow-hidden p-6 h-full">
        <div className="flex lg:items-center flex-col lg:flex-row justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex lg:items-center lg:flex-row flex-col gap-5 mt-5 lg:mt-10">
            <AiReportButton
              hasPremiumPlan={hasPremiumPlan}
              year={year}
              month={month}
            />
            <TimeSelect />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[2fr_1fr] flex flex-col gap-6 lg:overflow-hidden h-full">
          <div className="flex flex-col gap-6 lg:overflow-hidden h-full">
            <SummaryCards
              userCanAddTransaction={userCanAddTransaction}
              {...dashboard}
            />

            <div className="lg:grid lg:grid-cols-3 lg:grid-rows-1 flex flex-col gap-6 lg:overflow-hidden h-full">
              <TransactionsPieChart {...dashboard} />

              <ExpensePerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          <Suspense fallback={<LastTransactionSkeleton />}>
            <LastTransactions
              month={month}
              year={year}
              accessToken={accessToken!}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Home
