'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavHeader = () => {
  const pathname = usePathname()

  return (
    <div className="hidden items-center gap-10 lg:flex">
      <Link
        href="/admin"
        className={`font-bold hover:text-[#55B02E] ${
          pathname === '/admin'
            ? 'font-bold text-[#55B02E]'
            : 'text-muted-foreground'
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/admin/transactions"
        className={`font-bold hover:text-[#55B02E] ${
          pathname === '/admin/transactions'
            ? 'font-bold text-[#55B02E]'
            : 'text-muted-foreground'
        }`}
      >
        Transações
      </Link>
      <Link
        href="/admin/subscription"
        className={`font-bold hover:text-[#55B02E] ${
          pathname === '/admin/subscription'
            ? 'font-bold text-[#55B02E]'
            : 'text-muted-foreground'
        }`}
      >
        Assinaturas
      </Link>
    </div>
  )
}

export default NavHeader
