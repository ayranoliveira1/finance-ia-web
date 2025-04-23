import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { MoneyInput } from './money-transaction'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '../constants/transactions'
import { DatePicker } from './ui/date-picker'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { LoaderCircleIcon } from 'lucide-react'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@/types/enums'
import { createTransaction } from '@/http/create-transaction'
import { useAuth } from '@/auth/useAuth'
import { editTransaction } from '@/http/edit-transaction'
import { useQueryClient } from '@tanstack/react-query'

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatório',
  }),
  amount: z
    .number({
      message: 'O valor é obrigatório',
    })
    .positive({
      message: 'O valor deve ser positivo',
    }),
  type: z.nativeEnum(TransactionType, {
    required_error: 'O tipo é obrigatório',
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: 'A categoria é obrigatória',
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: 'O método de pagamento é obrigatório',
  }),
  date: z.date({
    required_error: 'A data é obrigatória.',
  }),
})

export type FormTransactionType = z.infer<typeof formSchema>

interface UpsertTransactionDialogProps {
  setDialogIsOpen: (isOpen: boolean) => void
  defaultValues?: FormTransactionType
  transactionId?: string
}

const UpsertTransactionDialog = ({
  setDialogIsOpen,
  defaultValues,
  transactionId,
}: UpsertTransactionDialogProps) => {
  const form = useForm<FormTransactionType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 50,
      category: TransactionCategory.EDUCATION,
      date: new Date(),
      name: '',
      paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
      type: TransactionType.INVESTMENT,
    },
  })

  const { accessToken } = useAuth()

  const { isSubmitting } = form.formState

  const isUpdate = Boolean(transactionId)

  const queryClient = useQueryClient()

  // Função para enviar os dados do formulário
  const onSubmit = async (data: FormTransactionType) => {
    try {
      if (isUpdate) {
        await editTransaction(data, accessToken!, transactionId!)
      } else {
        await createTransaction(data, accessToken!)
      }

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setDialogIsOpen(false)
      form.reset()
      toast.success('Transação salva com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar transação')
      console.log(error)
    }
  }

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues)
    }
  }, [defaultValues, form])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {isUpdate ? 'Atualizar' : 'Adicionar'} transação
        </DialogTitle>
        <DialogDescription>Insira as informações abaixo</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da transação</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <MoneyInput
                    placeholder="Digite o valor"
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TRANSACTION_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Método de pagamento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método de pagamento..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            {isSubmitting ? (
              <Button
                type="submit"
                disabled
                className="bg-[#55B02E] hover:bg-[#55B02E]/60 text-white"
              >
                <LoaderCircleIcon className="animate-spin" />
                {isUpdate ? 'Atualizando' : 'Adicionando'}
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-[#55B02E] hover:bg-[#55B02E]/60 text-white"
              >
                {isUpdate ? 'Atualizar' : 'Adicionar'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default UpsertTransactionDialog
