import * as z from 'zod'

/**
 * Schema for username update form
 */
export const usernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be at most 20 characters' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Username can only contain letters, numbers, underscores, and hyphens',
    }),
})

export type UsernameFormValues = z.infer<typeof usernameFormSchema>

/**
 * Schema for password update form
 */
export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Current password is required' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
    signOutOtherDevices: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type PasswordFormValues = z.infer<typeof passwordFormSchema>

/**
 * Schema for account deletion form
 */
export const deleteAccountFormSchema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password is required to delete your account' }),
})

export type DeleteAccountFormValues = z.infer<typeof deleteAccountFormSchema>
