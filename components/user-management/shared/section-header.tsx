import type { ReactNode } from 'react'

type SectionHeaderProps = {
  title: string
  children?: ReactNode
}

/**
 * A reusable section header component
 */
export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-sm font-medium">{title}</h4>
      {children}
    </div>
  )
}
