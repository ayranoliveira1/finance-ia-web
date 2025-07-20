'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  ArrowLeft,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPassword } from '@/http/forgot-password'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email({
    message: 'Digite um e-mail válido.',
  }),
})

type ForgotPasswordFormData = z.infer<typeof formSchema>

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true)
    const sendVeridyEmailResult = await forgotPassword(data.email)

    console.log('sendVeridyEmailResult', sendVeridyEmailResult)

    if (sendVeridyEmailResult?.error) {
      if (sendVeridyEmailResult.message === 'Invalid credentials') {
        setSubmitError('Credenciais inválidas. Tente novamente.')
        setIsSubmitting(false)
        return
      }

      setSubmitError(sendVeridyEmailResult.error)
      setIsSubmitting(false)
      return
    }

    setIsSuccess(true)
    setSubmitError('')
    setIsSubmitting(false)
  }

  const handleResendEmail = async () => {
    const email = getValues('email')
    if (!email) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await forgotPassword(email)
      console.log('Password reset email resent to:', email)
    } catch {
      setSubmitError('Erro ao reenviar e-mail. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const router = useRouter()

  if (isSuccess) {
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
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>

              <h1 className="text-2xl font-bold mb-2">E-mail Enviado!</h1>
              <p className="text-gray-400 text-sm">
                Enviamos um link para redefinir sua senha para{' '}
                <strong>{getValues('email')}</strong>
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-[#050A14] border border-gray-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <p className="font-medium mb-1">
                      Verifique sua caixa de entrada
                    </p>
                    <p className="text-gray-400">
                      Clique no link no e-mail para redefinir sua senha. O link
                      expira em 1 hora.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-gray-400">Não recebeu o e-mail?</p>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={handleResendEmail}
                    disabled={isSubmitting}
                    className="w-full border-gray-700 hover:bg-[#050A14] hover:border-green-500 bg-transparent"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Reenviando...
                      </div>
                    ) : (
                      'Reenviar e-mail'
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    asChild
                    className="w-full text-green-400 hover:text-green-300 hover:bg-green-500/10"
                  >
                    <Link href="/login">Voltar para o login</Link>
                  </Button>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500 space-y-1">
                <p>Verifique sua caixa de spam se não encontrar o e-mail.</p>
                <p>Se ainda tiver problemas, entre em contato conosco.</p>
              </div>
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
              <Mail className="h-8 w-8 text-green-500" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Esqueceu sua senha?</h1>
            <p className="text-gray-400 text-sm">
              Digite seu e-mail abaixo e enviaremos um link para redefinir sua
              senha.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="bg-[#050A14] border-gray-700 focus-visible:ring-green-500 focus-visible:border-green-500"
                  {...register('email', {
                    required: 'E-mail é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'E-mail inválido',
                    },
                  })}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email.message}
                  </motion.p>
                )}
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
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar link de recuperação
                  </div>
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-400">Lembrou da sua senha?</p>
                <Button
                  variant="ghost"
                  asChild
                  className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                >
                  <Link href="/login">Fazer login</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <div className="bg-[#0A1122] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Precisa de ajuda?
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Se você não conseguir acessar seu e-mail ou continuar tendo
              problemas, entre em contato conosco.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
            >
              Contatar suporte
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
