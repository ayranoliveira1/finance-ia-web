'use client'

import {
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, RefreshCcw, Shield, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { sendVerifyEmail } from '@/http/send-verify-email'
import { useRouter } from 'next/navigation'
import { verifyCode } from '@/http/verify-code'

const VerifyCodeForm = () => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(600)
  const [timeResendReset, setTimeResendReset] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const router = useRouter()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    if (timeLeft > 540) {
      const resendTimer = setInterval(() => {
        setTimeResendReset((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(resendTimer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)
    setError('')

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault()
    const pastedData = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
    }

    setCode(newCode)
    setError('')

    const nextIndex = newCode.findIndex((digit) => !digit)
    const focusIndex = nextIndex === -1 ? 5 : nextIndex
    inputRefs.current[focusIndex]?.focus()
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setError('')

    const email = localStorage.getItem('email')

    const response = await sendVerifyEmail(email!)

    if (response.error) {
      const errorMap: Record<string, string> = {
        'Validation failed':
          'O e-mail fornecido não é válido ou não está cadastrado.',
        'Invalid Credentials': 'Você não está autorizado a realizar esta ação.',
        'Bad request': 'Um e-mail de verificação já foi enviado recentemente.',
        'Too Many Requests': 'Muitas solicitações. Tente novamente mais tarde.',
        'Internal Server Error':
          'Erro interno do servidor. Tente novamente mais tarde.',
      }

      const message = response.message

      setError(errorMap[message])
      setIsResending(false)
      return
    }

    setTimeLeft(600)
    setCode(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
    setIsResending(false)

    router.refresh()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')

    if (code.some((digit) => digit === '')) {
      setError('Por favor, preencha todos os campos do código.')
      setIsSubmitting(false)
      return
    }

    const fullCode = code.join('')

    const email = localStorage.getItem('email')

    const response = await verifyCode({
      email: email!,
      code: fullCode,
    })

    console.log(response)

    if (response.error) {
      const errorMap: Record<string, string> = {
        'Validation failed':
          'O e-mail fornecido não é válido ou não está cadastrado.',
        'Invalid Credentials': 'Você não está autorizado a realizar esta ação.',
        'Email is already verified': 'O e-mail já foi verificado.',
        'Invalid code provided': 'O código fornecido é inválido.',
        'Verification code has expired':
          'O código de verificação expirou. Por favor, solicite um novo código.',
        'Bad request': 'Um e-mail de verificação já foi enviado recentemente.',
        'Too Many Requests': 'Muitas solicitações. Tente novamente mais tarde.',
        'Internal Server Error':
          'Erro interno do servidor. Tente novamente mais tarde.',
      }

      const message = response.message

      setError(errorMap[message])
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    localStorage.removeItem('email')

    router.push('/login')
  }

  const isCodeComplete = code.every((digit) => digit !== '')
  const isTimeExpired = timeLeft === 0

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

        <Card className="bg-[#0A1122] border-gray-800 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16  bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-green-500" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Verificação de Código</h1>
            <p className="text-gray-400 text-sm">
              Enviamos um código de verificação para o seu e-mail. Digite-o
              abaixo para continuar.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Timer className="h-4 w-4 text-green-500" />
              <span className="text-gray-400">Código expira em:</span>
              <span
                className={`font-mono font-bold ${isTimeExpired ? 'text-red-500' : 'text-green-500'}`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-3">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        e.target.value.replace(/\D/g, ''),
                      )
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={isTimeExpired}
                    className="w-12 h-12 text-center text-lg font-bold bg-[#050A14] border-gray-700 focus-visible:ring-green-500 focus-visible:border-green-500"
                  />
                ))}
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button
              onClick={() => handleSubmit()}
              disabled={
                !isCodeComplete || isSubmitting || isResending || isTimeExpired
              }
              className="w-full bg-green-500 hover:bg-green-600 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />{' '}
                  Verificando...
                </>
              ) : (
                'Verificar Código'
              )}
            </Button>

            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>Não recebeu o código?</span>
              </div>

              <Button
                onClick={() => handleResendCode()}
                disabled={isResending || timeLeft > 540}
                className="text-green-400 bg-transparent hover:text-green-300 hover:bg-green-500/10 disabled::opacity-50"
              >
                {isResending ? (
                  <>
                    <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                    Reenviando...
                  </>
                ) : timeLeft > 540 ? (
                  `Reenviar código em (${formatTime(timeResendReset)})`
                ) : (
                  'Reenviar Código'
                )}
              </Button>
            </div>

            <data className="text-center text-xs text-gray-500 space-y-1">
              <p>Verifique sua caixa de entrada se não encontrar o e-mail</p>
              <p>O código é valido por 10 minutos</p>
            </data>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default VerifyCodeForm
