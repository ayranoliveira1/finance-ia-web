'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Check, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/auth/useAuth'

export function PricingSection() {
  const plans = [
    {
      name: 'Gratuito',
      description: 'Controle financeiro básico para indivíduos',
      price: 0,
      features: [
        '10 transações por mês',
        'Rastreamento de despesas',
        'Orçamento básico',
        'Histórico de transações de 30 dias',
        'Suporte por e-mail',
      ],
      cta: 'Começar Agora',
      popular: false,
      link: '/register',
    },
    {
      name: 'Premium',
      description: 'Recursos avançados para gestão financeira pessoal',
      price: 9.0,
      features: [
        'Tudo do plano Gratuito',
        'Histórico de transações ilimitado',
        'Metas financeiras',
        'Suporte prioritário',
        'Relatórios avançados',
        'Exportação de dados',
      ],
      cta: 'Assinar Agora',
      popular: true,
      link: '/register',
    },
  ]

  const { user } = useAuth()

  return (
    <section
      id="pricing"
      className="py-20 md:py-32 bg-[#070D19] relative w-full flex justify-center"
    >
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>

      <div className="container px-4 relative w-full">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="font-medium">Preços Simples</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Escolha o plano certo para você
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            Seja você um indivíduo que busca gerenciar finanças pessoais ou
            precisa de ferramentas mais completas, temos um plano para você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <Card
                className={`bg-[#0A1122] border-gray-800 flex flex-col w-full ${
                  plan.popular
                    ? 'relative border-green-500 shadow-lg shadow-green-500/10'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black text-xs font-bold py-1 px-3 rounded-full">
                    Mais Popular
                  </div>
                )}

                <CardHeader className="pb-0">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="py-6">
                  <div className="mb-6">
                    <p className="text-4xl font-bold">
                      {plan.price === 0
                        ? 'Grátis'
                        : `R$ ${plan.price.toFixed(2)}`}
                      <span className="text-gray-400 text-base font-normal">
                        {plan.price > 0 ? '/mês' : ''}
                      </span>
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto pt-4">
                  {user ? (
                    <Button
                      asChild
                      className={
                        'w-full bg-green-500 hover:bg-green-600 text-black'
                      }
                    >
                      <Link href="/admin">Acessar</Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className={
                        'w-full bg-green-500 hover:bg-green-600 text-black'
                      }
                    >
                      <Link href={plan.link}>{plan.cta}</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
