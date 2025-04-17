import AddTransactionButton from '@/components/add-transaction-button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatCurrency } from '@/lib/currency'
import { ReactNode } from 'react'

interface SummaryCardProps {
  icon: ReactNode
  title: string
  amount: number
  size?: 'small' | 'large'
  userCanAddTransaction?: boolean
}

const SummaryCard = async ({
  icon,
  title,
  amount,
  size = 'small',
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p
          className={`${size === 'small' ? 'text-muted-foreground' : 'text-white opacity-70'}`}
        >
          {title}
        </p>
      </CardHeader>

      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === 'small' ? 'text-2xl' : 'text-4xl'}`}
        >
          {formatCurrency(amount)}
        </p>

        {size === 'large' && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  )
}

export default SummaryCard
