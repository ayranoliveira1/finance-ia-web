'use client'

import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useUserManagement } from '../user-management-context'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordFormSchema, type PasswordFormValues } from '../schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { FormEditCard } from '../shared/form-edit-card'
import { useEffect } from 'react'

export function PasswordSection() {
  const {
    settingPassword,
    setSettingPassword,
    handlePasswordUpdate,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    editPasswordError,
    setEditPasswordError,
    isLoading,
  } = useUserManagement()

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      signOutOtherDevices: true,
    },
  })

  const onSubmit = (data: PasswordFormValues) => {
    setEditPasswordError('')
    handlePasswordUpdate(data)
  }

  useEffect(() => {
    if (editPasswordError) {
      form.setError('currentPassword', {
        message: editPasswordError,
      })
    }
  }, [editPasswordError, form])

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 relative">
      <div>
        <h4 className="text-sm font-medium">Senha</h4>
      </div>

      {!settingPassword && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8"
          onClick={() => setSettingPassword(true)}
        >
          Redefinir senha
        </Button>
      )}

      <AnimatePresence>
        {settingPassword && (
          <FormEditCard
            title="Redefinir senha"
            onCancel={() => setSettingPassword(false)}
            isSubmitting={isLoading}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
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

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-300">
                        Nova senha
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showNewPassword ? 'text' : 'password'}
                            className="bg-gray-950 border-gray-800 focus:border-gray-700 focus:ring-gray-700 pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-300">
                        Confirmar senha
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="bg-gray-950 border-gray-800 focus:border-gray-700 focus:ring-gray-700 pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="signOutOtherDevices"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-700"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-gray-300">
                          Sair de todos os outros dispositivos
                        </FormLabel>
                        <FormDescription className="text-xs text-gray-400">
                          É recomendável sair de todos os outros dispositivos
                          que possam ter usado sua senha antiga.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setSettingPassword(false)}
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
