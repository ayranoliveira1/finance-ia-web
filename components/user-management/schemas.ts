import * as z from 'zod'

export const usernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username deve ter pelo menos 3 caracteres' })
    .max(20, { message: 'Username deve ter no máximo 20 caracteres' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Username deve conter apenas letras, números, traços e sublinhados',
    }),
})

export type UsernameFormValues = z.infer<typeof usernameFormSchema>

export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: 'Senha é obrigatória para deletar sua conta' }),
    newPassword: z
      .string()
      .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
      .regex(/[A-Z]/, {
        message: 'Senha deve conter pelo menos uma letra maiúscula',
      })
      .regex(/[a-z]/, {
        message: 'Senha deve conter pelo menos uma letra minúscula',
      })
      .regex(/[0-9]/, { message: 'Senha deve conter pelo menos um número' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Senha deve conter pelo menos um caractere especial',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' }),
    signOutOtherDevices: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })

export type PasswordFormValues = z.infer<typeof passwordFormSchema>

export const deleteAccountFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Senha é obrigatória para deletar sua conta' }),
})

export type DeleteAccountFormValues = z.infer<typeof deleteAccountFormSchema>
