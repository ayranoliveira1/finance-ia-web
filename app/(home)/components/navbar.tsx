'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <Link
            href="#testimonials"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Depoimentos
          </Link>
        </nav>

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
            <Link
              href="#testimonials"
              className="text-gray-300 hover:text-green-400 transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Depoimentos
            </Link>
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
          </nav>
        </div>
      )}
    </header>
  )
}
