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
import { fetchIp } from '@/http/fecth-ip'
import { FetchIP } from '@/types/fetch-ip'

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
      setError(
        result.error === 'CredentialsSignin'
          ? 'Email ou senha inválidos.'
          : result.error,
      )
    }

    if (result?.url) {
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
