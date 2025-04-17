import Image from 'next/image'
import { LogInIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Home = async () => {
  return (
    <div className="grid h-full items-center justify-items-center p-8 xl:grid-cols-2">
      <div className="mx-auto flex w-full max-w-[550px] flex-col justify-center">
        <Image
          src="logo.svg"
          width={173}
          height={39}
          alt="Finance Ai"
          className="mb-8"
        />

        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Bem-vindo</h1>

        <p className="mb-8 text-sm text-muted-foreground sm:text-base">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <Button variant="outline" asChild>
          <Link href={'/login'}>
            <LogInIcon className="mr-2" />
            Fazer login
          </Link>
        </Button>
      </div>

      <div className="relative hidden h-full w-full xl:block">
        <Image src="/login.png" alt="dashboard" fill className="object-cover" />
      </div>
    </div>
  )
}

export default Home
