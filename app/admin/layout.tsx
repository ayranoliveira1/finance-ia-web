import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finance App Admin',
  description: 'Painel de administração do Finance App',
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col lg:h-full lg:overflow-hidden">{children}</div>
  )
}
