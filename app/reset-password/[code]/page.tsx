import { ResetPasswordForm } from './components/reset-password-form'

interface ResetPasswordPageProps {
  params: Promise<{ code: string }>
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { code } = await params

  return (
    <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center p-4">
      <ResetPasswordForm code={code} />
    </main>
  )
}
