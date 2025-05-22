'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="py-20 md:py-32 relative w-full flex justify-center items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-[#0A1122] to-[#050A14]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] opacity-50"></div>

      <div className="lg:container px-4 relative">
        <motion.div
          className="max-w-4xl mx-auto bg-[#0A1122] border border-gray-800 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para assumir o controle das suas finanças?
          </h2>

          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já estão gerenciando suas
            finanças de forma mais inteligente com o Finance.ai.
          </p>

          <div className="flex justify-center">
            <Button
              asChild
              className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-6 text-lg"
            >
              <Link href={'/register'}>
                Cadastre-se Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
