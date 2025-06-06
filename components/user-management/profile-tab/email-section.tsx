'use client'

import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useUserManagement } from '../user-management-context'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { emailFormSchema, EmailFormValues } from '../schemas'

/**
 * Username section component for updating username with form validation
 */
export function EmailSection() {
  const {
    user,
    editingEmail,
    setEditingEmail,
    handleEmailUpdate,
    setEditEmailError,
    isLoading,
  } = useUserManagement()

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: user?.email,
    },
  })

  const onSubmit = (data: EmailFormValues) => {
    setEditEmailError('')
    handleEmailUpdate(data)
  }

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 relative">
      <div>
        <h4 className="text-sm font-medium mb-2">Email</h4>
        <p className="text-sm">{user?.email}</p>
      </div>

      {!editingEmail && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8"
          onClick={() => setEditingEmail(true)}
        >
          Atualizar email
        </Button>
      )}

      <AnimatePresence>
        {editingEmail && (
          <FormEditCard
            title="Atualizar email"
            onCancel={() => setEditingEmail(false)}
            isSubmitting={isLoading}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-300">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-950 border-gray-800 focus:border-gray-700 focus:ring-gray-700"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setEditingEmail(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="text-xs h-8 bg-[#55B02E] hover:bg-[#55B02E]/60 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Salvando...' : 'Salvar'}
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
