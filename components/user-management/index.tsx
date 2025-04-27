'use client'

import { UserManagementProvider } from './user-management-context'
import { UserManagementModal } from './user-management-modal'

/**
 * Main export component that wraps the modal with the context provider
 */
export default function UserManagement() {
  return (
    <UserManagementProvider>
      <UserManagementModal />
    </UserManagementProvider>
  )
}
