import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/constants/transactions'
import { getLastTransactions } from '@/http/data/transactions/get-last-transactions'
import { formatCurrency } from '@/lib/currency'
import { TransactionType } from '@/types/enums'
import { Transaction } from '@/types/transactions'
import Image from 'next/image'
import Link from 'next/link'

interface LastTransactionsProps {
  month: string
  year: string
  accessToken: string
}

const LastTransactions = async ({
  month,
  year,
  accessToken,
}: LastTransactionsProps) => {
  const lastTransactions = await getLastTransactions(accessToken, month, year)

  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return 'text-green-500'
    }
    if (transaction.type === TransactionType.EXPENSE) {
      return 'text-red-500'
    }
    return 'text-white'
  }

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return '+'
    }
    return '-'
  }

  return (
    <ScrollArea className="h-full rounded-xl border py-6">
      <CardHeader className="flex items-center justify-between h-full">
        <CardTitle className="font-bol">Últimas transações</CardTitle>
        <Button asChild variant="outline" className="rounded-full font-bold">
          <Link href="/admin/transactions">Ver mais</Link>
        </Button>
      </CardHeader>

      <div className="mx-6 mb-5 h-[1px] bg-white/10 mt-4"></div>

      <CardContent className="space-y-6 mt-2">
        {lastTransactions.transactions.map((transaction: Transaction) => (
          <div
            className="flex items-center justify-between"
            key={transaction.id}
          >
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/10 p-3">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  alt="pix"
                  height={20}
                  width={20}
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(transaction.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default LastTransactions
