'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import UpsertTransactionDialog from '@/components/upsert-transaction-dialog'
import { Transaction } from '@/types/transactions'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

interface EditTransactionButtonProps {
  transaction: Transaction
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(open) => {
        setDialogIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <UpsertTransactionDialog
        setDialogIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
          date: new Date(transaction.date),
        }}
        transactionId={transaction.id}
      />
    </Dialog>
  )
}

export default EditTransactionButton
