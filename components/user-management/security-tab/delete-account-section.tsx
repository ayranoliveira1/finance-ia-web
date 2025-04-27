'use client'

import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useUserManagement } from '../user-management-context'
import { SectionHeader } from '../shared/section-header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  deleteAccountFormSchema,
  type DeleteAccountFormValues,
} from '../schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormEditCard } from '../shared/form-edit-card'

/**
 * Delete account section component with form validation
 */
export function DeleteAccountSection() {
  const { deletingAccount, setDeletingAccount, handleDeleteAccount } =
    useUserManagement()

  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountFormSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (data: DeleteAccountFormValues) => {
    handleDeleteAccount(data)
  }

  return (
    <div className="py-4 relative">
      <SectionHeader title="Deletar conta" />

      {!deletingAccount && (
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-400 hover:bg-red-950/30 px-0"
          onClick={() => setDeletingAccount(true)}
        >
          Deletar conta
        </Button>
      )}

      <AnimatePresence>
        {deletingAccount && (
          <FormEditCard
            title="Deletar conta"
            onCancel={() => setDeletingAccount(false)}
            isSubmitting={form.formState.isSubmitting}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-300">
                        Senha atual
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="bg-gray-950 border-gray-800 focus:border-gray-700 focus:ring-gray-700"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <p className="text-xs text-gray-400 mb-4">
                  Esta ação não pode ser desfeita. Isso irá deletar
                  permanentemente sua conta e remover todos os seus dados.
                </p>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setDeletingAccount(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    className="text-xs h-8"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? 'Deletando...'
                      : 'Deletar conta'}
                  </Button>
                </div>
              </form>
            </Form>
          </FormEditCard>
        )}
      </AnimatePresence>
    </div>
  )
}
