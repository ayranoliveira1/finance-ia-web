import { PasswordSection } from './password-section'
import { DevicesSection } from './devices-section'
import { DeleteAccountSection } from './delete-account-section'

/**
 * Security tab component that combines all security-related sections
 */
export function SecurityTab() {
  return (
    <div className="p-6 space-y-6">
      <PasswordSection />
      <DevicesSection />
      <DeleteAccountSection />
    </div>
  )
}
