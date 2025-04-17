'use client'

import { ArrowDownUpIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'

import { useState } from 'react'
// import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(open) => {
        setDialogIsOpen(open)
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                disabled={!userCanAddTransaction}
                className="rounded-full font-bold"
              >
                Adicionar transações
                <ArrowDownUpIcon />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>
            {!userCanAddTransaction &&
              'Você já atingiu o limite de transações para este mês.'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* <UpsertTransactionDialog setDialogIsOpen={setDialogIsOpen} /> */}
    </Dialog>
  )
}

export default AddTransactionButton
