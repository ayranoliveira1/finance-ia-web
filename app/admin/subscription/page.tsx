import { redirect } from 'next/navigation'
import { CheckIcon, XIcon } from 'lucide-react'
import AcquirePlanButton from './components/acquire-plan-button'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/auth.config'
import { getCurrentMonthTransactions } from '@/http/data/transactions/get-current-month-transactions'

const SubscriptionPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const accessToken = session.accessToken
  const user = session.user

  const hasPremiumPlan = user?.subscriptionPlan === 'PREMIUM'

  const currentMonthTransactions =
    await getCurrentMonthTransactions(accessToken)

  if (!currentMonthTransactions) {
    redirect('/error?expired=1')
  }

  return (
    <>
      <Header />
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Assinaturas</h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          <Card className="max-w-[450px] lg:min-w-[450px] bg-transparent ">
            <CardHeader className="relative border-b border-solid py-8">
              {!hasPremiumPlan && (
                <Badge className="absolute left-4 top-12 bg-[#55B02E]/10 text-[#55B02E]">
                  Ativo
                </Badge>
              )}

              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>

              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl">0</span>
                <span className="text-xl text-muted-foreground">mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions.count}
                  /10)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-[450px] lg:min-w-[450px] bg-transparent">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-12 bg-[#55B02E]/10 text-[#55B02E]">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>

              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl">9</span>
                <span className="text-xl text-muted-foreground">mês</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-[#55B02E]" />
                <p>Transações ilimitadas</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-[#55B02E]" />
                <p>Relatórios de IA </p>
              </div>

              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default SubscriptionPage
