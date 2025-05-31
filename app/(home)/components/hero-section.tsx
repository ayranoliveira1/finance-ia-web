'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart2, PieChart, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center w-full"
    >
      <div className="flex-1 container flex flex-col items-center justify-center pt-20 pb-16 md:pb-24">
        <motion.div
          className="text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <span className="font-medium">Gestão Financeira Inteligente</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Assuma o controle das suas finanças com insights{' '}
            <span className="text-green-500">potencializados por IA</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Acompanhe despesas, gerencie investimentos e alcance seus objetivos
            financeiros com nosso dashboard intuitivo e recomendações
            inteligentes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-black font-medium px-8"
            >
              <Link href="/register">Comece gratuitamente</Link>
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Link href="#dashboard">Veja como funciona</Link>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="h-1 w-1 rounded-full bg-green-500 mr-2"></div>
              Sem cartão de crédito
            </div>
            <div className="flex items-center">
              <div className="h-1 w-1 rounded-full bg-green-500 mr-2"></div>
              Comece gratuitamente
            </div>
            <div className="flex items-center">
              <div className="h-1 w-1 rounded-full bg-green-500 mr-2"></div>
              Cancele quando quiser
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-5xl mt-12 md:mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-green-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-green-500/20 rounded-full filter blur-3xl"></div>

          <div className="relative bg-[#0A1122] border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>

            <div className="flex items-center p-4 border-b border-gray-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-sm text-gray-400">
                dashboard finance.ai
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
              <div className="bg-[#050A14] p-4 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">Saldo Total</h3>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold">R$ 24.563,00</p>
                <p className="text-xs text-green-500 mt-1">
                  +2,5% em relação ao mês passado
                </p>
              </div>

              <div className="bg-[#050A14] p-4 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">Despesas Mensais</h3>
                  <BarChart2 className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-2xl font-bold">R$ 3.489,00</p>
                <p className="text-xs text-red-500 mt-1">
                  -4,3% em relação ao mês passado
                </p>
              </div>

              <div className="bg-[#050A14] p-4 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">Meta de Economia</h3>
                  <PieChart className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold">68%</p>
                <p className="text-xs text-green-500 mt-1">
                  R$ 6.800 de R$ 10.000
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050A14] to-transparent pointer-events-none"></div>
    </section>
  )
}
