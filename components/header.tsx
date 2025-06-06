'use client'

import Image from 'next/image'
import NavHeader from './nav-header'
import MenuHeader from './menu-header'
import { useAuth } from '@/auth/useAuth'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { LogOutIcon, TouchpadIcon, UserIcon } from 'lucide-react'
import ActionModal from './action-modal'
import UserManagement from './user-management'
import Link from 'next/link'

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance Ai" width={173} height={39} />

        <NavHeader />
      </div>

      <ActionModal
        position="bottom_center"
        width="xl"
        trigger={
          <div className="rounded-lg px-3 py-1 bg-transparent items-center gap-2 hover:bg-[#100f1a] hidden lg:flex">
            <span className="text-sm font-semibold text-white">
              {user?.name}
            </span>
            <Avatar>
              <AvatarImage src={user?.image || ''} alt={user?.name} />
              <AvatarFallback>
                <UserIcon className="size-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        }
        content={
          <div className="flex flex-col">
            <div className="flex gap-2 items-center px-4 border-b shadow-b-sm py-4">
              <Avatar>
                <AvatarImage src={user?.image || ''} alt={user?.name} />
                <AvatarFallback className="text-xs">
                  <UserIcon className="size-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white flex items-center justify-between w-[300px]">
                  <span>{user?.name || 'Usuário'}</span>
                  <span className="text-xs text-[#55B02E] font-semibold">
                    {user?.subscriptionPlan === 'FREE'
                      ? 'free'
                      : user?.subscriptionPlan === 'PREMIUM'
                        ? 'Premium'
                        : 'Visitante'}
                  </span>
                </span>
                <span className="text-xs text-gray-400">{user?.email}</span>
              </div>
            </div>

            <UserManagement />

            <Link
              href="/"
              className="flex gap-4 items-center px-6 py-5 hover:bg-[#100f1a] cursor-pointer lg:border-b lg:shadow-b-sm"
            >
              <TouchpadIcon className="size-4 text-white/80 " />
              <span className="text-sm text-white/80">Web Site</span>
            </Link>

            <div
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex gap-4 items-center px-6 py-5 hover:bg-[#100f1a] cursor-pointer"
            >
              <LogOutIcon className="size-4 text-white/80 " />
              <span className="text-sm text-white/80">Sair</span>
            </div>
          </div>
        }
      />
      <MenuHeader />
    </header>
  )
}

export default Header
