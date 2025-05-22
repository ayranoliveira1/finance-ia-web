import AddTransactionButton from '@/components/add-transaction-button'
import Header from '@/components/header'
import { DataTable } from './components/data-table'
import { transactionColumns } from './_columns'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/auth.config'
import { redirect } from 'next/navigation'
import { canUserAddTransaction } from '@/lib/can-user-add-transactions'

const TransactionsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const accessToken = session.accessToken

  const userCanAddTransaction = await canUserAddTransaction()

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-4 overflow-hidden py-6 px-5">
        <div className="flex w-full items-center justify-between px-1">
          <h1 className="lg:text-2xl text-xl font-bold">Transações</h1>

          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        <DataTable accessToken={accessToken} columns={transactionColumns} />
      </div>
    </>
  )
}

export default TransactionsPage
