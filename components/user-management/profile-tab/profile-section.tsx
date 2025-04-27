'use client'

import { AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Upload, UserIcon } from 'lucide-react'
import { useUserManagement } from '../user-management-context'
import { useForm } from 'react-hook-form'
import { FormEditCard } from '../shared/form-edit-card'

/**
 * Profile section component for updating user profile picture
 */
export function ProfileSection() {
  const {
    userData,
    editingProfile,
    setEditingProfile,
    handleProfileUpdate,
    handleFileChange,
  } = useUserManagement()

  const form = useForm()

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 relative">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          {userData.avatarUrl ? (
            <AvatarImage
              src={userData.avatarUrl || '/placeholder.svg'}
              alt="Profile"
            />
          ) : (
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          )}
        </Avatar>
        <span>{userData.username}</span>
      </div>

      {!editingProfile && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-8"
          onClick={() => setEditingProfile(true)}
        >
          Atualizar perfil
        </Button>
      )}

      <AnimatePresence>
        {editingProfile && (
          <FormEditCard
            title="Atualizar perfil"
            onCancel={() => setEditingProfile(false)}
            isSubmitting={form.formState.isSubmitting}
          >
            <form
              onSubmit={form.handleSubmit(handleProfileUpdate)}
              className="space-y-4"
            >
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-14 w-14">
                  {userData.avatarUrl ? (
                    <AvatarImage
                      src={userData.avatarUrl || '/placeholder.svg'}
                      alt="Profile"
                    />
                  ) : (
                    <AvatarFallback>
                      <UserIcon />
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="flex mt-1 items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-md cursor-pointer"
                >
                  <Upload className="h-3 w-3" />
                  Upload
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Tamanho recomendado 1:1, até 10 MB.
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => setEditingProfile(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className="text-xs h-8 bg-gray-700 hover:bg-gray-600"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </FormEditCard>
        )}
      </AnimatePresence>
    </div>
  )
}
