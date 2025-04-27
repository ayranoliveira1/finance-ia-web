import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '../shared/section-header'

/**
 * Devices section component for displaying active devices
 */
export function DevicesSection() {
  return (
    <div className="py-4 border-b border-gray-800">
      <SectionHeader title="Active devices" />

      <div className="bg-gray-950 rounded-md p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 mt-0.5 bg-black rounded-sm flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Windows</span>
              <Badge
                variant="outline"
                className="text-xs bg-gray-800 text-gray-300 border-gray-700"
              >
                This device
              </Badge>
            </div>
            <div className="text-sm text-gray-400 mt-1">Chrome 135.0.0.0</div>
            <div className="text-sm text-gray-400 mt-0.5">
              177.66.254.10 (Carvalhos, BR)
            </div>
            <div className="text-sm text-gray-400 mt-0.5">Today at 8:21 AM</div>
          </div>
        </div>
      </div>
    </div>
  )
}
