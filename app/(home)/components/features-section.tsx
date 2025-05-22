'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  Bell,
  FileText,
  LineChart,
  PieChart,
  Wallet,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: <BarChart3 className="h-10 w-10 text-green-500" />,
    title: 'Controle de Despesas',
    description:
      'Categorize e acompanhe automaticamente suas despesas para entender para onde vai seu dinheiro.',
  },
  {
    icon: <PieChart className="h-10 w-10 text-green-500" />,
    title: 'Planejamento de Orçamento',
    description:
      'Crie orçamentos personalizados para diferentes categorias e receba alertas quando estiver próximo dos limites.',
  },
  {
    icon: <LineChart className="h-10 w-10 text-green-500" />,
    title: 'Monitoramento de Investimentos',
    description:
      'Acompanhe o desempenho dos seus investimentos e receba recomendações baseadas em IA para otimizar retornos.',
  },
  {
    icon: <Bell className="h-10 w-10 text-green-500" />,
    title: 'Notificações Inteligentes',
    description:
      'Receba alertas oportunos sobre gastos incomuns, contas a pagar e oportunidades de investimento.',
  },
  {
    icon: <Wallet className="h-10 w-10 text-green-500" />,
    title: 'Metas Financeiras',
    description:
      'Defina e acompanhe o progresso em direção aos seus objetivos financeiros com planos de ação personalizados.',
  },
  {
    icon: <FileText className="h-10 w-10 text-green-500" />,
    title: 'Relatórios Detalhados',
    description:
      'Acesse relatórios personalizados e análises profundas sobre seus hábitos financeiros com visualizações claras e insights acionáveis.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/10 rounded-full filter blur-3xl"></div>

      <div className="container px-4 relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <Zap className="h-4 w-4 mr-2" />
            <span className="font-medium">Recursos Poderosos</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tudo o que você precisa para gerenciar suas finanças
          </h2>

          <p className="text-gray-400 text-lg">
            Nosso conjunto abrangente de ferramentas ajuda você a acompanhar,
            planejar e otimizar sua vida financeira com facilidade e precisão.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#0A1122] border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-[#050A14] p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
