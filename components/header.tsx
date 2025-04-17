'use client'

import Image from 'next/image'
import NavHeader from './nav-header'
import MenuHeader from './menu-header'
import { useAuth } from '@/auth/useAuth'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const Header = () => {
  const { user } = useAuth()

  console.log('user', user)
  console.log('user?.role', user?.role)
  console.log('user?.subscriptionPlan', user?.subscriptionPlan)

  return (
    <header className="flex items-center justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance Ai" width={173} height={39} />

        <NavHeader />
      </div>

      <div className="hidden lg:flex">{user?.role}</div>
      <Button onClick={() => signOut({ callbackUrl: '/login' })}>Sair</Button>

      <MenuHeader />
    </header>
  )
}

export default Header
