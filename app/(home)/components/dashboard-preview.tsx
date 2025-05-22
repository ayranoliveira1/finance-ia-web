'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  BarChart2,
  DollarSign,
  LineChart,
  PieChart,
} from 'lucide-react'

export function DashboardPreview() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id="dashboard"
      className="py-20 md:py-32 bg-[#070D19] relative overflow-hidden w-full flex justify-center"
    >
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>

      <div className="container px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <span className="font-medium">Dashboard Intuitivo</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visualize suas finanças com nosso poderoso dashboard
            </h2>

            <p className="text-gray-400 text-lg mb-8">
              Obtenha uma visão completa da sua saúde financeira com gráficos
              interativos, atualizações em tempo real e insights baseados em IA
              que ajudam você a tomar melhores decisões financeiras.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                {
                  icon: <BarChart2 className="h-5 w-5 text-green-500" />,
                  text: 'Acompanhe receitas e despesas com categorização detalhada',
                },
                {
                  icon: <PieChart className="h-5 w-5 text-green-500" />,
                  text: 'Visualize padrões de gastos e identifique oportunidades de economia',
                },
                {
                  icon: <LineChart className="h-5 w-5 text-green-500" />,
                  text: 'Monitore o desempenho dos investimentos e a alocação da carteira',
                },
                {
                  icon: <DollarSign className="h-5 w-5 text-green-500" />,
                  text: 'Defina e acompanhe o progresso em direção aos objetivos financeiros',
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1">{item.icon}</div>
                  <span className="text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>

            <Button className="group">
              Explorar recursos do dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            ref={ref}
            className="lg:w-1/2"
            style={{ y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-700 rounded-xl blur-sm opacity-50"></div>
              <div className="relative bg-[#050A14] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center p-4 border-b border-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-sm text-gray-400">
                    Dashboard Financeiro
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#0A1122] p-4 rounded-lg">
                      <h3 className="text-gray-400 text-sm mb-2">Saldo</h3>
                      <p className="text-xl font-bold">R$ 3.609,00</p>
                    </div>
                    <div className="bg-[#0A1122] p-4 rounded-lg">
                      <h3 className="text-gray-400 text-sm mb-2">Receita</h3>
                      <p className="text-xl font-bold text-green-500">
                        R$ 5.204,00
                      </p>
                    </div>
                    <div className="bg-[#0A1122] p-4 rounded-lg">
                      <h3 className="text-gray-400 text-sm mb-2">Despesas</h3>
                      <p className="text-xl font-bold text-red-500">
                        R$ 1.595,00
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#0A1122] p-4 rounded-lg">
                      <h3 className="text-gray-400 text-sm mb-4">
                        Gastos por Categoria
                      </h3>
                      <div className="flex items-center justify-center h-40">
                        <div className="relative w-32 h-32">
                          <div className="absolute inset-0 rounded-full border-8 border-green-500 rotate-45"></div>
                          <div
                            className="absolute inset-0 rounded-full border-8 border-red-500"
                            style={{
                              clipPath: 'polygon(0 0, 25% 0, 25% 100%, 0 100%)',
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#0A1122] p-4 rounded-lg">
                      <h3 className="text-gray-400 text-sm mb-4">
                        Tendência Mensal
                      </h3>
                      <div className="flex items-end justify-between h-40 pt-4">
                        {[35, 55, 40, 70, 60, 45, 80].map((height, i) => (
                          <div
                            key={i}
                            className="w-6 bg-green-500/80 rounded-t-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0A1122] p-4 rounded-lg">
                    <h3 className="text-gray-400 text-sm mb-4">
                      Transações Recentes
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: 'Supermercado',
                          amount: '-R$ 120,50',
                          date: 'Hoje',
                        },
                        {
                          name: 'Depósito de Salário',
                          amount: '+R$ 3.400,00',
                          date: 'Ontem',
                          positive: true,
                        },
                        {
                          name: 'Conta de Luz',
                          amount: '-R$ 85,20',
                          date: '15 de Maio',
                        },
                      ].map((tx, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2 border-b border-gray-800"
                        >
                          <div>
                            <p className="font-medium">{tx.name}</p>
                            <p className="text-xs text-gray-500">{tx.date}</p>
                          </div>
                          <p
                            className={
                              tx.positive ? 'text-green-500' : 'text-red-500'
                            }
                          >
                            {tx.amount}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
