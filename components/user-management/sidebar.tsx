'use client'

import { useUserManagement } from './user-management-context'

/**
 * Sidebar component for the user management modal
 */
export function Sidebar() {
  const { activeTab, setActiveTab } = useUserManagement()

  return (
    <div className="w-full md:w-64 bg-gray-950 p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Conta</h2>
        <p className="text-sm text-gray-400">
          Gerencie as informações da sua conta.
        </p>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`w-full flex items-center gap-3 px-4 cursor-pointer py-2 rounded-md text-left ${
            activeTab === 'profile' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span>Perfil</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`w-full flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md text-left ${
            activeTab === 'security' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span>Segurança</span>
        </button>
      </nav>

      {/* <div className="mt-auto pt-6 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span>Secured by</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7.2C3 5.43269 4.43269 4 6.2 4H9.8C11.5673 4 13 5.43269 13 7.2V8.8C13 10.5673 11.5673 12 9.8 12H6.2C4.43269 12 3 10.5673 3 8.8V7.2Z"
              fill="#6366F1"
            />
            <path
              d="M6.2 7.2C6.2 6.53726 6.73726 6 7.4 6H8.6C9.26274 6 9.8 6.53726 9.8 7.2V8.8C9.8 9.46274 9.26274 10 8.6 10H7.4C6.73726 10 6.2 9.46274 6.2 8.8V7.2Z"
              fill="white"
            />
          </svg>
          <span>clerk</span>
        </div>
        <div className="mt-1 text-orange-500">Development mode</div>
      </div> */}
    </div>
  )
}
