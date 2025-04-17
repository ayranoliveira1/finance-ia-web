import { redirect } from 'next/navigation'
// import TimeSelect from './_components/time-select'
import { isMatch } from 'date-fns'
import ExpensePerCategory from './_components/expenses-per-category'
// import LastTransactions from './_components/last-transactions'
import { Suspense } from 'react'
import LastTransactionSkeleton from './_components/skeleton/last-tranasaction-skeleton'
import Header from '@/components/header'

interface HomePros {
  searchParams: {
    month: string
    year: string
  }
}

const Home = async ({ searchParams: { year, month } }: HomePros) => {
  const yearIsValid = !year || !isMatch(year, 'yyyy')
  const monthIsValid = !month || !isMatch(month, 'MM')

  if (yearIsValid && monthIsValid) {
    redirect(
      `/admin/?month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`,
    )
  }

  // const dashboard = await getDashboard({ month, year });

  // const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-6 overflow-hidden p-6">
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
            {/* <TimeSelect /> */}
          </div>
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            {/* <SummaryCards
              userCanAddTransaction={userCanAddTransaction}
              {...dashboard}
            /> */}

            <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              {/* <TransactionsPieChart {...dashboard} /> */}

              <ExpensePerCategory
              //  expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          <Suspense fallback={<LastTransactionSkeleton />}>
            {/* <LastTransactions month={month} year={year} /> */}
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Home
