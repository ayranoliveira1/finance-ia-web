'use client'

import type React from 'react'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type {
  UsernameFormValues,
  PasswordFormValues,
  DeleteAccountFormValues,
  EmailFormValues,
} from './schemas'
import { useAuth } from '@/auth/useAuth'
import { deleteAccount } from '@/http/actions/user/delete-account'
import { toast } from 'sonner'
import { signOut, useSession } from 'next-auth/react'
import { editUser } from '@/http/actions/user/edit-user'
import { User } from 'next-auth'

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
  user: User | undefined
  userData: UserData
  setUserData: (data: Partial<UserData>) => void

  // Edit states
  editingProfile: boolean
  setEditingProfile: (editing: boolean) => void
  editingUsername: boolean
  setEditingUsername: (editing: boolean) => void
  editingEmail: boolean
  setEditingEmail: (editing: boolean) => void
  settingPassword: boolean
  setSettingPassword: (setting: boolean) => void
  deletingAccount: boolean
  setDeletingAccount: (deleting: boolean) => void

  // Error state
  deleteAccountError: string
  setDeleteAccountError: (error: string) => void
  editPasswordError: string
  setEditPasswordError: (error: string) => void
  editEmailError: string
  setEditEmailError: (error: string) => void
  editUsernameError: string
  setEditUsernameError: (error: string) => void

  // Password visibility
  showNewPassword: boolean
  setShowNewPassword: (show: boolean) => void
  showConfirmPassword: boolean
  setShowConfirmPassword: (show: boolean) => void

  // Form submission handlers
  handleProfileUpdate: () => void
  handleUsernameUpdate: (data: UsernameFormValues) => void
  handleEmailUpdate: (data: EmailFormValues) => void
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
  const [editingEmail, setEditingEmail] = useState(false)
  const [settingPassword, setSettingPassword] = useState(false)
  const [deletingAccount, setDeletingAccount] = useState(false)

  const [deleteAccountError, setDeleteAccountError] = useState('')
  const [editPasswordError, setEditPasswordError] = useState('')
  const [editEmailError, setEditEmailError] = useState('')
  const [editUsernameError, setEditUsernameError] = useState('')

  const { user, accessToken } = useAuth()
  const { update } = useSession()

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

  const handleUsernameUpdate = async (data: UsernameFormValues) => {
    setIsLoading(true)

    const dataUsername = {
      name: data.username,
    }

    const response = await editUser(dataUsername, accessToken!)

    if (response !== 'success') {
      toast.error('Erro ao atualizar nome de usuário.')
      const errorMessage =
        response.message === 'Invalid credentials'
          ? 'Erro ao atualizar nome de usuário.'
          : response.message

      setEditUsernameError(errorMessage)
      setIsLoading(false)
      return
    }
    await update()

    toast.success('Nome de usuário atualizado com sucesso!', {
      style: {
        backgroundColor: '#55B02E',
        color: '#fff',
        borderColor: '#438d24',
      },
      duration: 2000,
    })
    setEditingUsername(false)
    setIsLoading(false)
  }

  const handleEmailUpdate = async (data: EmailFormValues) => {
    setIsLoading(true)

    const dataEmail = {
      email: data.email,
    }

    const response = await editUser(dataEmail, accessToken!)

    if (response !== 'success') {
      toast.error('Erro ao atualizar email.')
      const errorMessage =
        response.message === 'Invalid credentials'
          ? 'Erro ao atualizar email.'
          : response.message

      setEditEmailError(errorMessage)
      setIsLoading(false)
      return
    }
    await update()

    toast.success('Email atualizado com sucesso!', {
      style: {
        backgroundColor: '#55B02E',
        color: '#fff',
        borderColor: '#438d24',
      },
      duration: 2000,
    })
    setEditingEmail(false)
    setIsLoading(false)
  }

  const handlePasswordUpdate = async (data: PasswordFormValues) => {
    setIsLoading(true)

    const dataPassword = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }

    const response = await editUser(dataPassword, accessToken!)

    if (response !== 'success') {
      toast.error('Erro ao atualizar senha.')
      const errorMessage =
        response.message === 'Invalid credentials'
          ? 'Senha atual incorreta.'
          : response.message

      setEditPasswordError(errorMessage)
      setIsLoading(false)
      return
    }

    await update()

    toast.success('Senha atualizada com sucesso!', {
      style: {
        backgroundColor: '#55B02E',
        color: '#fff',
        borderColor: '#438d24',
      },
      duration: 2000,
    })
    setSettingPassword(false)
    setIsLoading(false)
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

    toast.success('Conta deletada com sucesso!', {
      style: {
        backgroundColor: '#55B02E',
        color: '#fff',
        borderColor: '#438d24',
      },
      duration: 2000,
    })
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
    user,
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
    editingEmail,
    setEditingEmail,
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
    handleEmailUpdate,
    handlePasswordUpdate,
    handleDeleteAccount,
    handleFileChange,
    deleteAccountError,
    setDeleteAccountError,
    editPasswordError,
    setEditPasswordError,
    editEmailError,
    setEditEmailError,
    editUsernameError,
    setEditUsernameError,
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
