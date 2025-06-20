'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LogIn } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Link from 'next/link'
import { Register } from '@/http/register'
import { toast } from 'sonner'
import { sendVerifyEmail } from '@/http/send-verify-email'

const formSchema = z
  .object({
    name: z.string().min(3, {
      message: 'O nome é obrigatório.',
    }),
    email: z.string().email({
      message: 'Digite um email válido.',
    }),
    password: z.string().min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'A confirmação de senha deve ter pelo menos 8 caracteres.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem.',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof formSchema>

export function RegisterForm() {
  const [error, setError] = useState('')

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: RegisterFormValues) {
    const dataToRegister = {
      name: data.name,
      email: data.email,
      password: data.password,
    }

    const result = await Register(dataToRegister)

    if (result.statusCode === 409) {
      setError('Email já cadastrado.')
      return
    }

    if (result.statusCode === 500) {
      setError('Ocorreu um erro ao criar sua conta.')
      return
    }

    toast.success('Conta criada com sucesso!')

    if (result.statusCode === 201) {
      const sendVeridyEmailResult = await sendVerifyEmail(data.email)

      console.log('sendVeridyEmailResult', sendVeridyEmailResult)

      if (sendVeridyEmailResult?.error) {
        if (sendVeridyEmailResult.message === 'Email is already verified') {
          setError('Email já verificado.')
          return
        }

        if (sendVeridyEmailResult.message === 'Invalid credentials') {
          setError('Credenciais inválidas. Tente novamente.')
          return
        }

        setError(sendVeridyEmailResult.error)
        return
      }

      router.push('/verify-email')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu nome"
                  {...field}
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="seu@email.com"
                  {...field}
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Confirmar Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  className="border-gray-700 bg-gray-800 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-2">Carregando...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <LogIn className="mr-2 h-4 w-4" />
              Criar conta
            </div>
          )}
        </Button>

        <p className="flex items-center justify-center gap-1 text-sm text-gray-400">
          Já tem uma conta?
          <Link href="/login" className="text-green-500 hover:underline">
            Faça login
          </Link>
        </p>

        {error && (
          <div className="my-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
      </form>
    </Form>
  )
}
