'use client'

import { MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuHeader = () => {
  const pathname = usePathname()

  return (
    <nav className="flex lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon className="size-5" />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <Image src="/logo.svg" alt="Finance Ai" width={123} height={39} />
          </SheetHeader>

          <SheetDescription>
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/admin"
                className={`w-full rounded-sm px-3 py-1 text-base font-bold hover:bg-gray-700/20 hover:text-primary ${
                  pathname === '/admin'
                    ? 'bg-gray-700/20 font-bold text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/transactions"
                className={`w-full rounded-sm px-3 py-1 text-base font-bold hover:bg-gray-700/20 hover:text-primary ${
                  pathname === '/admin/transactions'
                    ? 'bg-gray-700/20 font-bold text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                Transações
              </Link>
              <Link
                href="/admin/subscription"
                className={`w-full rounded-sm px-3 py-1 text-base font-bold hover:bg-gray-700/20 hover:text-primary ${
                  pathname === '/admin/subscription'
                    ? 'bg-gray-700/20 font-bold text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                Assinaturas
              </Link>
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MenuHeader
