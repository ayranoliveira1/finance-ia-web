'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'

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
import { useQuery } from '@tanstack/react-query'
import { fetchIp } from '@/http/data/user/fecth-ip'
import { FetchIP } from '@/types/fetch-ip'
import { getCookies } from '@/lib/get-cookies'
import { deleteCookie } from '@/lib/delete-cookies'

const formSchema = z.object({
  email: z.string().email({
    message: 'Digite um email válido.',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter pelo menos 8 caracteres.',
  }),
})

export type LoginFormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const [error, setError] = useState('')

  const router = useRouter()

  const { data: requestData, isLoading } = useQuery<FetchIP>({
    queryKey: ['ip'],
    queryFn: fetchIp,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginFormValues) {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      ip: requestData?.ip,
      callbackUrl: '/admin',
    })

    if (result?.error) {
      const errorAuth = getCookies('auth_error')

      if (!errorAuth) {
        setError('Ocorreu um erro ao fazer login. Tente novamente.')
        return
      }

      const decodedError = decodeURIComponent(errorAuth)

      const errorMap: Record<string, string> = {
        'Invalid credentials': 'Email ou senha inválidos.',
        'Email is not verified': 'Email não verificado.',
        'User is not active': 'Conta inativa. Entre em contato com o suporte.',
        'Bad Request': 'Requisição inválida. Verifique os dados enviados.',
        'Internal Server Error':
          'Erro interno do servidor. Tente novamente mais tarde.',
      }

      setError(errorMap[decodedError])
      deleteCookie('auth_error')

      localStorage.setItem('email', data.email)
    }

    if (result?.url) {
      localStorage.removeItem('email')
      router.push(result.url)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="flex items-center justify-end -mt-4">
          <Link
            className="text-xs text-green-500 hover:underline"
            href={'/forgot-password'}
          >
            Esqueceu a senha?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          disabled={form.formState.isSubmitting || isLoading}
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-2">Carregando...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <LogIn className="mr-2 h-4 w-4" />
              Fazer login
            </div>
          )}
        </Button>

        <p className="flex items-center justify-center gap-1 text-sm text-gray-400">
          Não possui conta?
          <Link href="/register" className="text-green-500 hover:underline">
            Cadastre-se
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
