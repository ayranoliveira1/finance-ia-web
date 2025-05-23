'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HouseIcon, LogOutIcon, Menu, UserIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useAuth } from '@/auth/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ActionModal from '@/components/action-modal'
import UserManagement from '@/components/user-management'
import { signOut } from 'next-auth/react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ',
        isScrolled
          ? 'bg-[#050A14]/90 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-5',
      )}
    >
      <div className="lg:container flex items-center justify-between mx-auto px-5">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={150} height={40} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Recursos
          </Link>
          <Link
            href="#dashboard"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="#pricing"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Preços
          </Link>
          {/* <Link
            href="#testimonials"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Depoimentos
          </Link> */}
        </nav>

        {user ? (
          <ActionModal
            position="bottom_center"
            width="xl"
            trigger={
              <div className="rounded-lg px-3 py-1 bg-transparent items-center gap-2 hover:bg-[#100f1a] hidden lg:flex">
                <span className="text-sm font-semibold text-white">
                  {user?.name}
                </span>
                <Avatar>
                  <AvatarImage src={user?.image || ''} alt={user?.name} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            }
            content={
              <div className="flex flex-col">
                <div className="flex gap-2 items-center px-4 border-b shadow-b-sm py-4">
                  <Avatar>
                    <AvatarImage src={user?.image || ''} alt={user?.name} />
                    <AvatarFallback className="text-xs">
                      <UserIcon className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white flex items-center justify-between w-[300px]">
                      <span>{user?.name || 'Usuário'}</span>
                      <span className="text-xs text-[#55B02E] font-semibold">
                        {user?.subscriptionPlan === 'FREE'
                          ? 'free'
                          : user?.subscriptionPlan === 'PREMIUM'
                            ? 'Premium'
                            : 'Visitante'}
                      </span>
                    </span>
                    <span className="text-xs text-gray-400">{user?.email}</span>
                  </div>
                </div>

                <UserManagement />

                <Link
                  href="/admin"
                  className="flex gap-4 items-center px-6 py-5 hover:bg-[#100f1a] cursor-pointer lg:border-b lg:shadow-b-sm"
                >
                  <HouseIcon className="size-4 text-white/80 " />
                  <span className="text-sm text-white/80">Dashboard</span>
                </Link>

                <div
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex gap-4 items-center px-6 py-5 hover:bg-[#100f1a] cursor-pointer"
                >
                  <LogOutIcon className="size-4 text-white/80 " />
                  <span className="text-sm text-white/80">Sair</span>
                </div>
              </div>
            }
          />
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:text-green-400 hover:bg-[#0F172A]"
            >
              <Link href="/login">Entrar</Link>
            </Button>
            <Button
              asChild
              className="bg-green-500 hover:bg-green-600 text-black font-medium"
            >
              <Link href="/register">Cadastre-se grátis</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050A14]/95 backdrop-blur-md p-4 shadow-lg border-t border-gray-800 animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-4 py-4">
            <Link
              href="#features"
              className="text-gray-300 hover:text-green-400 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link
              href="#dashboard"
              className="text-gray-300 hover:text-green-400 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-green-400 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preços
            </Link>
            {/* <Link
              href="#testimonials"
              className="text-gray-300 hover:text-green-400 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Depoimentos
            </Link> */}
            {user ? (
              <>
                <div className="flex gap-3 items-center px-4 pt-4 border-t">
                  <div className="flex items-center gap-3 ">
                    <Avatar>
                      <AvatarImage src={user?.image || ''} alt={user?.name} />
                      <AvatarFallback>
                        <UserIcon className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-white">{user?.name}</span>
                  </div>
                </div>

                <Link
                  href="/admin"
                  className="gap-4 items-center flex px-4 py-3 hover:bg-[#100f1a] cursor-pointer"
                >
                  <HouseIcon className="size-4 text-white/80 " />
                  <span className="text-sm text-white/80">Dashboard</span>
                </Link>

                <div
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="gap-4 items-center flex px-4 py-3 hover:bg-[#100f1a] cursor-pointer"
                >
                  <LogOutIcon className="size-4 text-white/80 " />
                  <span className="text-sm text-white/80">Sair</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                <Button
                  variant="ghost"
                  className="text-white hover:text-green-400 hover:bg-[#0F172A] w-full justify-start"
                >
                  Entrar
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-black font-medium w-full">
                  Cadastre-se grátis
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
