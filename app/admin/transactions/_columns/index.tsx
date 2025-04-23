'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Transaction } from '@/types/transactions'
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from '@/constants/transactions'
import { formatCurrency } from '@/lib/currency'
import TransactionTypeBadge from '../components/type-badge'
import EditTransactionButton from '../components/edit-transaction-button'

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Metodo de pagamento',
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) =>
      formatCurrency(Number(transaction.amount)),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />

          {/* <DeleteTransactionButton transactionId={transaction.id} /> */}
        </div>
      )
    },
  },
]
