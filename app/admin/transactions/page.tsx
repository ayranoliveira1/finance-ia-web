import AddTransactionButton from '@/components/add-transaction-button'
import Header from '@/components/header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DataTable } from './components/data-table'
import { transactionColumns } from './_columns'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/auth.config'
import { redirect } from 'next/navigation'

const TransactionsPage = async () => {
  const userCanAddTransaction = true
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const accessToken = session.accessToken

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-4 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>

          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        <ScrollArea className="h-full">
          <DataTable accessToken={accessToken} columns={transactionColumns} />
        </ScrollArea>
      </div>
    </>
  )
}

export default TransactionsPage
