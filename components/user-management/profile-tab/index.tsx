import { ProfileSection } from './profile-section'
import { UsernameSection } from './username-section'
import { EmailSection } from './email-section'

/**
 * Profile tab component that combines all profile-related sections
 */
export function ProfileTab() {
  return (
    <div className="p-6 space-y-6">
      <ProfileSection />
      <UsernameSection />
      <EmailSection />
    </div>
  )
}
