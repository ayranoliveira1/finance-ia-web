'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type FormEditCardProps = {
  title: string
  children: ReactNode
  onCancel: () => void
  isSubmitting?: boolean
  saveLabel?: string
  saveVariant?: 'default' | 'destructive'
}

/**
 * A reusable animated card component for form editing
 */
export function FormEditCard({ title, children }: FormEditCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="absolute right-0 top-0 w-full md:w-96 bg-gray-900 border border-gray-800 rounded-md shadow-lg p-4 z-10"
    >
      <h4 className="text-sm font-medium mb-4">{title}</h4>

      {children}
    </motion.div>
  )
}
