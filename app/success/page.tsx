'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PaymentSuccessPage() {
  const { update } = useSession()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )
  const updateCalled = useRef(false)

  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await update()
        setStatus('success')
        setTimeout(() => router.push('/admin'), 1500)
      } catch (error) {
        console.error('Failed to update session:', error)
        setStatus('error')
      }
    }

    const timer = setTimeout(() => {
      if (!updateCalled.current) {
        updateCalled.current = true
        handleUpdate()
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [update, router])

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Pagamento Concluído!</h1>
          <p className="text-lg mb-4 text-red-500">
            Seu pagamento foi aprovado, mas houve um problema ao atualizar sua
            sessão.
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-[#55B02E] text-white rounded hover:bg-[#619963] transition duration-200"
          >
            Ir para o Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#55B02E]">
          Pagamento Concluído!
        </h1>
        <p className="text-lg mb-8">
          {status === 'loading'
            ? 'Ativando seu plano...'
            : 'Plano ativado com sucesso! Redirecionando...'}
        </p>
        <div className="flex justify-center">
          <LoaderIcon className="size-10 animate-spin text-[#55B02E]" />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Você será redirecionado automaticamente
        </p>
      </div>
    </div>
  )
}
