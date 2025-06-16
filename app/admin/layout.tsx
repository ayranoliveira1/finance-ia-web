import { authOptions } from '@/auth/auth.config'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Finance App Admin',
  description: 'Painel de administração do Finance App',
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col lg:h-full lg:overflow-hidden">{children}</div>
  )
}
