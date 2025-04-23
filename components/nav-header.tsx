'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavHeader = () => {
  const pathname = usePathname()

  return (
    <div className="hidden items-center gap-10 lg:flex">
      <Link
        href="/"
        className={`font-bold hover:text-primary ${
          pathname === '/' ? 'font-bold text-primary' : 'text-muted-foreground'
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/admin/transactions"
        className={`font-bold hover:text-primary ${
          pathname === '/admin/transactions'
            ? 'font-bold text-primary'
            : 'text-muted-foreground'
        }`}
      >
        Transações
      </Link>
      <Link
        href="/admin/subscription"
        className={`font-bold hover:text-primary ${
          pathname === '/admin/subscription'
            ? 'font-bold text-primary'
            : 'text-muted-foreground'
        }`}
      >
        Assinaturas
      </Link>
    </div>
  )
}

export default NavHeader
