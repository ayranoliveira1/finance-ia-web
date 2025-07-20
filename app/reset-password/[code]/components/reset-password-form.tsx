'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  Shield,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { resetPassword } from '@/http/reset-password'
import { useRouter } from 'next/navigation'

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(
        /[^A-Za-z0-9]/,
        'A senha deve conter pelo menos um caractere especial',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

interface ResetPasswordFormProps {
  code: string
}

export function ResetPasswordForm({ code }: ResetPasswordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isValidCode, setIsValidCode] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  })

  const password = watch('newPassword')

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    const labels = ['', 'Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte']
    const colors = [
      '',
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-emerald-500',
    ]

    return {
      strength,
      label: labels[strength],
      color: colors[strength],
    }
  }

  const passwordStrength = getPasswordStrength(password || '')

  const router = useRouter()

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true)
    setSubmitError('')

    const resetPasswordResponse = await resetPassword({
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
      code,
    })

    if (resetPasswordResponse?.error) {
      if (
        resetPasswordResponse.message === 'Invalid code provided' ||
        resetPasswordResponse.message === 'Verification code has expired'
      ) {
        setIsValidCode(false)
        setIsSubmitting(false)
        return
      }

      if (resetPasswordResponse.message === 'Invalid credentials') {
        setSubmitError(resetPasswordResponse.message)
        setIsSubmitting(false)
        return
      }

      setSubmitError(resetPasswordResponse.message || 'Erro desconhecido')
    }

    setIsValidCode(true)
    setIsSuccess(true)
    setIsSubmitting(false)
    setSubmitError('')
  }

  if (!isValidCode) {
    return (
      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => router.back()}
            className="inline-flex items-center bg-transparent hover:bg-transparent text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <Card className="bg-[#0A1122] border-gray-800 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>

              <h1 className="text-2xl font-bold mb-2">Link Inválido</h1>
              <p className="text-gray-400 text-sm">
                Este link de redefinição de senha é inválido ou expirou.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">
                  Os links de redefinição de senha expiram em 10 minutos por
                  motivos de segurança.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-medium"
                >
                  <Link href="/forgot-password">Solicitar novo link</Link>
                </Button>

                <Button
                  variant="ghost"
                  asChild
                  className="w-full text-green-400 hover:text-green-300 hover:bg-green-500/10"
                >
                  <Link href="/login">Voltar para o login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>

          <Card className="bg-[#0A1122] border-gray-800 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>

              <h1 className="text-2xl font-bold mb-2">Senha Atualizada!</h1>
              <p className="text-gray-400 text-sm">
                Sua senha foi redefinida com sucesso. Agora você pode fazer
                login com sua nova senha.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-[#050A14] border border-gray-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <p className="font-medium mb-1">Sua conta está segura</p>
                    <p className="text-gray-400">
                      Para sua segurança, você foi desconectado de todos os
                      dispositivos e precisará fazer login novamente.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-green-500 hover:bg-green-600 text-black font-medium"
              >
                <Link href="/login">Fazer login</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Link>

        <Card className="bg-[#0A1122] border-gray-800 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-green-500" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Redefinir Senha</h1>
            <p className="text-gray-400 text-sm">
              Digite sua nova senha abaixo. Certifique-se de criar uma senha
              forte e segura.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Nova Senha
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua nova senha"
                    className="bg-[#050A14] border-gray-700 focus-visible:ring-green-500 focus-visible:border-green-500 pr-10"
                    {...register('newPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{
                            width: `${(passwordStrength.strength / 5) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 min-w-[80px]">
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                )}

                {errors.newPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm flex items-start"
                  >
                    <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                    {errors.newPassword.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-300"
                >
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirme sua nova senha"
                    className="bg-[#050A14] border-gray-700 focus-visible:ring-green-500 focus-visible:border-green-500 pr-10"
                    {...register('confirmNewPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmNewPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.confirmNewPassword.message}
                  </motion.p>
                )}
              </div>

              <div className="bg-[#050A14] border border-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Requisitos da senha:
                </h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li
                    className={`flex items-center ${/^.{8,}$/.test(password || '') ? 'text-green-500' : ''}`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full mr-2 ${/^.{8,}$/.test(password || '') ? 'bg-green-500' : 'bg-gray-500'}`}
                    />
                    Pelo menos 8 caracteres
                  </li>
                  <li
                    className={`flex items-center ${/[A-Z]/.test(password || '') ? 'text-green-500' : ''}`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full mr-2 ${/[A-Z]/.test(password || '') ? 'bg-green-500' : 'bg-gray-500'}`}
                    />
                    Uma letra maiúscula
                  </li>
                  <li
                    className={`flex items-center ${/[a-z]/.test(password || '') ? 'text-green-500' : ''}`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full mr-2 ${/[a-z]/.test(password || '') ? 'bg-green-500' : 'bg-gray-500'}`}
                    />
                    Uma letra minúscula
                  </li>
                  <li
                    className={`flex items-center ${/[0-9]/.test(password || '') ? 'text-green-500' : ''}`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full mr-2 ${/[0-9]/.test(password || '') ? 'bg-green-500' : 'bg-gray-500'}`}
                    />
                    Um número
                  </li>
                  <li
                    className={`flex items-center ${/[^A-Za-z0-9]/.test(password || '') ? 'text-green-500' : ''}`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(password || '') ? 'bg-green-500' : 'bg-gray-500'}`}
                    />
                    Um caractere especial
                  </li>
                </ul>
              </div>

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                >
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {submitError}
                  </p>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Redefinindo senha...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Redefinir senha
                  </div>
                )}
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Ao redefinir sua senha, você será desconectado de todos os
                  dispositivos.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
