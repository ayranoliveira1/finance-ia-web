'use client'

import { LogOutIcon, MenuIcon, TouchpadIcon, UserIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/auth/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { signOut } from 'next-auth/react'
import UserManagement from './user-management'

const MenuHeader = () => {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <nav className="flex lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon className="size-6" />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <Image src="/logo.svg" alt="Finance Ai" width={123} height={39} />
          </SheetHeader>

          <div className="flex flex-col gap-4 px-2">
            <div className="flex gap-3 pt-1 items-center px-2">
              <div className="flex items-center gap-3 ">
                <Avatar>
                  <AvatarImage src={user?.image || ''} alt={user?.name} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="font-bold text-white">{user?.name}</span>
              </div>
            </div>

            <Link
              href="/admin"
              className={`w-full rounded-sm px-3 py-1 text-base font-bold hover:bg-gray-700/20 hover:text-[#55B02E] ${
                pathname === '/admin'
                  ? 'bg-gray-700/20 font-bold text-[#55B02E]'
                  : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/transactions"
              className={`w-full rounded-sm px-3 py-1 text-base font-bold hover:bg-gray-700/20 hover:text-[#55B02E] ${
                pathname === '/admin/transactions'
                  ? 'bg-gray-700/20 font-bold text-[#55B02E]'
                  : 'text-muted-foreground'
              }`}
            >
              Transações
            </Link>
            <Link
              href="/admin/subscription"
              className={`w-full rounded-sm px-3 py-1 text-base font-bold hover:bg-gray-700/20 hover:text-[#55B02E] ${
                pathname === '/admin/subscription'
                  ? 'bg-gray-700/20 font-bold text-[#55B02E]'
                  : 'text-muted-foreground'
              }`}
            >
              Assinaturas
            </Link>
          </div>

          <SheetFooter>
            <Link
              href="/"
              className="flex gap-4 items-center py-5 hover:bg-[#100f1a] cursor-pointer lg:border-b lg:shadow-b-sm"
            >
              <TouchpadIcon className="size-4 text-white/80 " />
              <span className="text-sm text-white/80">Web Site</span>
            </Link>

            <UserManagement />

            <div
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex gap-4 items-center py-5 hover:bg-[#100f1a] cursor-pointer"
            >
              <LogOutIcon className="size-4 text-white/80 " />
              <span className="text-sm text-white/80">Sair</span>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MenuHeader
