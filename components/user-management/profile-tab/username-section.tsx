'use client'

import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useUserManagement } from '../user-management-context'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usernameFormSchema, type UsernameFormValues } from '../schemas'
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
 * Username section component for updating username with form validation
 */
export function UsernameSection() {
  const {
    user,
    editingUsername,
    setEditingUsername,
    handleUsernameUpdate,
    setEditUsernameError,
    isLoading,
  } = useUserManagement()

  const form = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: user?.name,
    },
  })

  const onSubmit = (data: UsernameFormValues) => {
    setEditUsernameError('')
    handleUsernameUpdate(data)
  }

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 relative">
      <div>
        <h4 className="text-sm font-medium mb-2">Username</h4>
        <p className="text-sm">{user?.name}</p>
      </div>

      {!editingUsername && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8"
          onClick={() => setEditingUsername(true)}
        >
          Atualizar username
        </Button>
      )}

      <AnimatePresence>
        {editingUsername && (
          <FormEditCard
            title="Atualizar username"
            onCancel={() => setEditingUsername(false)}
            isSubmitting={isLoading}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-300">
                        Username
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
                    onClick={() => setEditingUsername(false)}
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
