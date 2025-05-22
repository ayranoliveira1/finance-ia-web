'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { SettingsIcon } from 'lucide-react'
import { useUserManagement } from './user-management-context'
import { Sidebar } from './sidebar'
import { ProfileTab } from './profile-tab'
import { SecurityTab } from './security-tab'

export function UserManagementModal() {
  const { isOpen, setIsOpen, activeTab } = useUserManagement()

  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen(true)}
        className="flex gap-4 items-center lg:px-6 lg:border-b lg:shadow-b-sm cursor-pointer lg:py-5 hover:bg-[#100f1a]"
      >
        <SettingsIcon className="size-4 text-white/80 " />
        <span className="text-sm text-white/80">Gerenciar conta</span>
      </div>

      <div className="w-screen h-full">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="p-0 lg:min-w-[900px] h-[600px] lg:h-[700px] bg-gray-900 border-gray-800 text-white lg:overflow-hidden">
            <DialogTitle className="hidden"></DialogTitle>
            <div className="flex flex-col overflow-y-scroll lg:overflow-auto md:flex-row lg:min-h-[700px] md:h-[600px]">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto lg:min-h-[700px]">
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                  <h3 className="text-lg font-medium">
                    {activeTab === 'profile'
                      ? 'Detalhes do perfil'
                      : 'Segurança'}
                  </h3>
                </div>

                {activeTab === 'profile' ? <ProfileTab /> : <SecurityTab />}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
