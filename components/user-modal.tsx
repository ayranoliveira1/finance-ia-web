import { ReactNode, useState } from 'react'

interface ModalhoverProps {
  trigger: ReactNode
  content: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right' | 'bottom_center'
  width?: 'sm' | 'md' | 'lg' | 'xl'
}

const UserModal = ({ trigger, content, position, width }: ModalhoverProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const positionClasses = {
    top: 'bottom-full mb-1',
    bottom: 'mt-2',
    left: 'right-full mr-2 top-0',
    right: 'left-full ml-2 top-0',
    bottom_center: 'mt-1 right-0',
  }

  const widthClasses = {
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
    xl: 'w-96',
  }

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer inline-block"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>

      <div
        className={`absolute ${isOpen ? 'block' : 'hidden'} z-50 bg-black border rounded-lg shadow-sm transition-all duration-300 ${
          position ? positionClasses[position] : 'mt-1'
        } ${width ? widthClasses[width] : 'w-48'} `}
      >
        {content}
      </div>
    </div>
  )
}

export default UserModal
