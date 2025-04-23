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
      <Badge className="gap-2 bg-[#55B02E]/10 font-bold text-[#55B02E] hover:bg-muted">
        <CircleIcon className="fill-[#55B02E]" size={10} />
        Depósito
      </Badge>
    )
  }
  // Check if the transaction is a transfer
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="gap-2 bg-red-500/10 font-bold text-red-500 hover:bg-red-500 hover:bg-opacity-10">
        <CircleIcon className="fill-red-500" size={10} />
        Despesa
      </Badge>
    )
  }

  return (
    <Badge className="gap-2 bg-white/10 font-bold text-white hover:bg-white hover:bg-opacity-10">
      <CircleIcon className="fill-white" size={10} />
      ivestimnento
    </Badge>
  )
}

export default TransactionTypeBadge
