import Image from 'next/image'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/auth.config'
import { RegisterForm } from './components/register-form'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/admin')
  }

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <div className="container flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6">
        <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-8">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Finance.ai Logo"
              width={130}
              height={130}
            />
          </div>
          <div className="w-full space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-white">Bem-vindo</h2>
              <p className="text-sm text-gray-400">
                A Finance AI é uma plataforma de gestão financeira que utiliza
                IA para monitorar suas movimentações, e oferecer insights
                personalizados, facilitando o controle do seu orçamento.
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
