import { redirect } from 'next/navigation'
// import TimeSelect from './_components/time-select'
import { isMatch } from 'date-fns'
// import ExpensePerCategory from './_components/expenses-per-category'
// import LastTransactions from './_components/last-transactions'
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

  // const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-6 overflow-hidden p-6 h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-5">
            {/* <AiReportButton
              hasPremiumPlan={
                (await user).publicMetadata.subscriptionPlan === 'premium'
              }
              year={year}
              month={month}
            /> */}
            <TimeSelect />
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-6 overflow-hidden h-full">
          <div className="flex flex-col gap-6 overflow-hidden h-full">
            <SummaryCards userCanAddTransaction={true} {...dashboard} />

            <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden h-full">
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
