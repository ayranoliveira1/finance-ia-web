'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { useSession, signOut } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function TokenWatcher() {
  const { data: session, status } = useSession()
  const [showModal, setShowModal] = useState(false)
  const [countdown, setCountdown] = useState(10)

  const searchParams = useSearchParams()
  const expired = searchParams.get('expired')

  useEffect(() => {
    if (
      status === 'authenticated' &&
      session?.error === 'RefreshAccessTokenError'
    ) {
      console.warn('Refresh token expirado. Fazendo signOut...')
      setShowModal(true)

      const count = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      const timer = setTimeout(() => {
        signOut({
          callbackUrl: '/login',
        })
      }, 10000)
      return () => {
        clearInterval(count)
        clearTimeout(timer)
      }
    }
  }, [session, status])

  useEffect(() => {
    if (expired === '1') {
      setShowModal(true)
      const count = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      const timer = setTimeout(() => {
        signOut({
          callbackUrl: '/login',
        })
      }, 10000)

      return () => {
        clearInterval(count)
        clearTimeout(timer)
      }
    }
  }, [session, status])

  const handleLogin = () => {
    signOut({
      callbackUrl: '/login',
    })
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[button[data-dialog-close]]:hidden"
      >
        <h2>Sessão Expirada</h2>
        <p>Seu token de acesso expirou. Por favor, faça login novamente.</p>
        <p>
          Você será redirecionado para a página de login em {countdown}{' '}
          segundos. Se quiser, pode clicar no botão abaixo para fazer login
          imediatamente.
        </p>

        <DialogFooter>
          <Button
            className="bg-[#55B02E] hover:bg-[#55B02E]/60"
            onClick={handleLogin}
          >
            Fazer Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
