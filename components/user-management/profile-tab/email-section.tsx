import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useUserManagement } from '../user-management-context'
import { SectionHeader } from '../shared/section-header'

/**
 * Email section component for managing email addresses
 */
export function EmailSection() {
  const { userData } = useUserManagement()

  return (
    <div className="py-4 border-b border-gray-800">
      <SectionHeader title="Endereços de e-mail">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </SectionHeader>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">{userData.email}</span>
          <Badge
            variant="outline"
            className="text-xs bg-gray-800 text-gray-300 border-gray-700"
          >
            Primário
          </Badge>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-xs h-8 pl-0 flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        Adicionar endereço de e-mail
      </Button>
    </div>
  )
}
