'use client'

// import { loadStripe } from '@stripe/stripe-js'

// import { createStripeCheckout } from '../_actions/create-stripe-checkout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/auth/useAuth'
import { paymentStripe } from '@/http/actions/plan/payment-stripe'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { ManagePlanModal } from './manager-plan'

const AcquirePlanButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)

  const { user, accessToken } = useAuth()

  const router = useRouter()

  const handleAcquirePlanClick = async () => {
    setIsLoading(true)
    const response = await paymentStripe(accessToken!)
    setIsLoading(false)

    const url = response.checkout_url

    router.push(url)
  }

  const hashPriemiumPlan = user?.subscriptionPlan === 'PREMIUM'
  // href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.email}`}

  if (hashPriemiumPlan) {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          asChild
          className="w-full rounded-full border border-[#55B02E] font-bold"
          variant="link"
        >
          <Link href={''}>Gerenciar Plano</Link>
        </Button>
        <ManagePlanModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    )
  }

  return (
    <Button
      className="w-full rounded-full bg-[#55B02E] text-white font-bold"
      onClick={handleAcquirePlanClick}
    >
      {isLoading ? (
        <>
          <LoaderCircleIcon className="animate-spin" /> carregando
        </>
      ) : (
        'Adquirir Plano'
      )}
    </Button>
  )
}

export default AcquirePlanButton
