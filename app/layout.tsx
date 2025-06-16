import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import AuthProvider from '@/providers/auth'
import QueryProvider from '@/providers/query-provider'
import { TokenWatcher } from '@/auth/token-watcher'
import { Suspense } from 'react'

const mulish = Mulish({
  subsets: ['latin-ext'],
})

// app/layout.tsx

export const metadata: Metadata = {
  title: 'Finance AI | Gerencie suas finanças pessoais',
  description:
    'Acompanhe seus gastos, controle seu orçamento e alcance seus objetivos financeiros com o Financi.',
  keywords: [
    'finanças pessoais',
    'gerenciador financeiro',
    'controle de gastos',
    'orçamento',
    'Next.js',
  ],
  authors: [{ name: 'Seu Nome', url: 'https://seusite.com' }],
  creator: 'Financi',
  metadataBase: new URL('https://financi.com'),
  openGraph: {
    title: 'Financi – Controle suas finanças com facilidade',
    description:
      'Aplicativo de gerenciamento financeiro pessoal, simples, intuitivo e poderoso.',
    url: 'https://financi.com',
    siteName: 'Finance AI',
    images: [
      {
        url: 'https://financi.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Preview do Finance AI',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance AI – Gerencie suas finanças',
    description:
      'Veja onde está indo seu dinheiro e tenha controle do seu orçamento.',
    creator: '@ayranoliveira',
    images: ['https://financi.com/finance.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${mulish.className} dark antialiased scroll-smooth`}>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
          <Suspense fallback={null}>
            <TokenWatcher />
          </Suspense>

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
