import { Badge } from '@/components/ui/badge'
import { TransactionType } from '@/types/enums'
import { Transaction } from '@/types/transactions'
import { CircleIcon } from 'lucide-react'

interface TransactionTypeBadgeProps {
  transaction: Transaction
}

// This component renders a badge indicating the type of transaction
const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  // Check the type of transaction and render the corresponding badge
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="gap-2 bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="fill-primary" size={10} />
        Depósito
      </Badge>
    )
  }
  // Check if the transaction is a transfer
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="gap-2 bg-danger bg-opacity-10 font-bold text-danger hover:bg-danger hover:bg-opacity-10">
        <CircleIcon className="fill-danger" size={10} />
        Despesa
      </Badge>
    )
  }

  return (
    <Badge className="gap-2 bg-white bg-opacity-10 font-bold text-white hover:bg-white hover:bg-opacity-10">
      <CircleIcon className="fill-white" size={10} />
      ivestimnento
    </Badge>
  )
}

export default TransactionTypeBadge
