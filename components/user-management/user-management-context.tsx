'use client'

import type React from 'react'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type {
  UsernameFormValues,
  PasswordFormValues,
  DeleteAccountFormValues,
} from './schemas'
import { useAuth } from '@/auth/useAuth'
import { deleteAccount } from '@/http/delete-account'
import { toast } from 'sonner'
import { signOut } from 'next-auth/react'

type UserData = {
  username: string
  avatarUrl: string
  email: string
}

type UserManagementContextType = {
  // Modal state
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  activeTab: 'profile' | 'security'
  setActiveTab: (tab: 'profile' | 'security') => void

  // User data
  userData: UserData
  setUserData: (data: Partial<UserData>) => void

  // Edit states
  editingProfile: boolean
  setEditingProfile: (editing: boolean) => void
  editingUsername: boolean
  setEditingUsername: (editing: boolean) => void
  settingPassword: boolean
  setSettingPassword: (setting: boolean) => void
  deletingAccount: boolean
  setDeletingAccount: (deleting: boolean) => void

  // Error state
  deleteAccountError: string
  setDeleteAccountError: (error: string) => void

  // Password visibility
  showNewPassword: boolean
  setShowNewPassword: (show: boolean) => void
  showConfirmPassword: boolean
  setShowConfirmPassword: (show: boolean) => void

  // Form submission handlers
  handleProfileUpdate: () => void
  handleUsernameUpdate: (data: UsernameFormValues) => void
  handlePasswordUpdate: (data: PasswordFormValues) => void
  handleDeleteAccount: (data: DeleteAccountFormValues) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UserManagementContext = createContext<
  UserManagementContextType | undefined
>(undefined)

export function UserManagementProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')

  const [editingProfile, setEditingProfile] = useState(false)
  const [editingUsername, setEditingUsername] = useState(false)
  const [settingPassword, setSettingPassword] = useState(false)
  const [deletingAccount, setDeletingAccount] = useState(false)

  const [deleteAccountError, setDeleteAccountError] = useState('')

  const { user, accessToken } = useAuth()

  const [userData, setUserDataState] = useState<UserData>({
    username: user?.name || '',
    avatarUrl: user?.image || '',
    email: user?.email || '',
  })

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState((prev) => ({ ...prev, ...data }))
  }

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleProfileUpdate = () => {
    setEditingProfile(false)
  }

  const handleUsernameUpdate = (data: UsernameFormValues) => {
    console.log('Username update data:', data)
    setUserData({ username: data.username })
    setEditingUsername(false)
  }

  const handlePasswordUpdate = (data: PasswordFormValues) => {
    console.log('Password update data:', data)
    setSettingPassword(false)
  }

  const handleDeleteAccount = async (data: DeleteAccountFormValues) => {
    setIsLoading(true)

    const response = await deleteAccount(data.password, accessToken!)

    if (response !== 'success') {
      toast.error('Erro ao deletar conta.')
      const errorMessage =
        response.message === 'Invalid credentials'
          ? 'Senha incorreta.'
          : response.message

      setDeleteAccountError(errorMessage)
      setIsLoading(false)
      return
    }

    toast.success('Conta deletada com sucesso!')
    signOut()

    setDeletingAccount(false)
    setIsLoading(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUserData({ avatarUrl: url })
    }
  }

  const value = {
    isOpen,
    setIsOpen,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    userData,
    setUserData,
    editingProfile,
    setEditingProfile,
    editingUsername,
    setEditingUsername,
    settingPassword,
    setSettingPassword,
    deletingAccount,
    setDeletingAccount,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleProfileUpdate,
    handleUsernameUpdate,
    handlePasswordUpdate,
    handleDeleteAccount,
    handleFileChange,
    deleteAccountError,
    setDeleteAccountError,
  }

  return (
    <UserManagementContext.Provider value={value}>
      {children}
    </UserManagementContext.Provider>
  )
}

export function useUserManagement() {
  const context = useContext(UserManagementContext)
  if (context === undefined) {
    throw new Error(
      'useUserManagement must be used within a UserManagementProvider',
    )
  }
  return context
}
