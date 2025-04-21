'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { LoaderCircleIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteTransactionButtonProps {
  transactionId: string
}

const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

  // Function to handle the deletion of a transaction
  // It sets the loading state, calls the deleteTransaction function,
  // and handles success and error cases
  // Finally, it resets the loading state and closes the alert dialog
  const handleDeleteTransaction = async () => {
    try {
      setIsLoading(true)
      // await deleteTransaction({ id: transactionId });
      console.log('Deleting transaction with ID:', transactionId)
      toast.success('Transação deletada com sucesso!')
    } catch (error) {
      toast.error('Erro ao deletar transação!')
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsAlertOpen(false)
    }
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja deletar essa transação?</AlertDialogTitle>

          <AlertDialogDescription>
            Uma vez deletada não poderá recuperá-la.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancela</AlertDialogCancel>

          <Button
            disabled={isLoading}
            onClick={handleDeleteTransaction}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading && <LoaderCircleIcon className="animate-spin" />}
            {isLoading ? 'Deletando' : 'Deletar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionButton
