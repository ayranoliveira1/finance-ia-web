'use client'

import { useAuth } from '@/auth/useAuth'
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
import { deleteTransaction } from '@/http/actions/transactions/delete-transaction'
import { useQueryClient } from '@tanstack/react-query'
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

  const { accessToken } = useAuth()

  const queryClient = useQueryClient()

  const handleDeleteTransaction = async () => {
    try {
      setIsLoading(true)
      await deleteTransaction(transactionId, accessToken!)
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      console.log('Deleting transaction with ID:', transactionId)
      toast.success('Transação deletada com sucesso!', {
        style: {
          backgroundColor: '#55B02E',
          color: '#fff',
          borderColor: '#438d24',
        },
        duration: 2000,
      })
    } catch (error) {
      toast.error('Erro ao deletar transação!', {
        style: {
          backgroundColor: '#FF0000',
          color: '#fff',
          borderColor: '#c40202',
        },
        duration: 2000,
      })
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
            className="bg-red-500 hover:bg-red-600 text-white"
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
