'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, MessageSquare, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Pequena Empresária',
    content:
      'O Finance.ai transformou completamente a forma como gerencio as finanças do meu negócio. O rastreamento e categorização de despesas me economiza horas todos os meses, e os insights me ajudaram a identificar várias áreas onde eu poderia reduzir custos.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Designer Freelancer',
    content:
      'Como freelancer, acompanhar receitas e despesas sempre foi um desafio. O Finance.ai torna isso simples com categorização automática e recursos de preparação fiscal. Agora posso focar mais no meu trabalho de design em vez de me preocupar com finanças.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Gerente de Marketing',
    content:
      'As ferramentas de orçamento do Finance.ai me ajudaram a economizar para o pagamento da entrada da minha primeira casa. Os gráficos visuais facilitam ver para onde vai meu dinheiro, e o recurso de acompanhamento de metas me mantém motivada.',
    rating: 4,
  },
  {
    name: 'David Kim',
    role: 'Engenheiro de Software',
    content:
      'Já experimentei vários aplicativos financeiros, mas o Finance.ai se destaca com sua interface limpa e recursos poderosos. As ferramentas de acompanhamento de investimentos e análise de portfólio são particularmente impressionantes.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Profissional de Saúde',
    content:
      'O Finance.ai me deu tranquilidade sobre meu futuro financeiro. As ferramentas de planejamento de aposentadoria e recomendações de investimento são adaptadas aos meus objetivos e tolerância ao risco.',
    rating: 4,
  },
  {
    name: 'James Wilson',
    role: 'Estudante de Pós-Graduação',
    content:
      'Com um orçamento apertado de estudante, o Finance.ai tem sido inestimável. Ele me ajuda a acompanhar cada real e a seguir meu orçamento. O planejador de pagamento de dívidas está me ajudando a lidar com meus empréstimos estudantis de forma estratégica.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= testimonials.length ? 0 : prevIndex + 3,
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(testimonials.length - 3, 0) : prevIndex - 3,
    )
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3)

  return (
    <section id="testimonials" className="py-20 md:py-32 relative">
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full filter blur-3xl"></div>

      <div className="container px-4 relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="font-medium">Histórias de Clientes</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Confiado por milhares de usuários em todo o mundo
          </h2>

          <p className="text-gray-400 text-lg">
            Ouça nossos usuários sobre como o Finance.ai os ajudou a assumir o
            controle de suas vidas financeiras e alcançar seus objetivos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={index + currentIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#0A1122] border-gray-800 h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-6">{testimonial.content}</p>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-black font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Anterior</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Próximo</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
