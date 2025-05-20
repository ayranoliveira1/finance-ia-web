import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import SummaryCard from './summary-card'

interface SummaryCardsProps {
  balanc: number
  depositTotal: number
  investmentTotal: number
  expensesTotal: number
  userCanAddTransaction?: boolean
}

const SummaryCards = async ({
  balanc,
  depositTotal,
  investmentTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <div className="hidden lg:block">
        <SummaryCard
          userCanAddTransaction={userCanAddTransaction}
          icon={<WalletIcon size={18} />}
          title="Saldo"
          amount={balanc}
          size="large"
        />
      </div>

      <div className="lg:hidden">
        <SummaryCard
          icon={<WalletIcon size={18} />}
          title="Saldo"
          amount={balanc}
          size="small"
        />
      </div>

      <div className="lg:grid lg:grid-cols-[1.4fr_1fr_1fr] flex flex-col gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={Number(investmentTotal)}
        />

        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={Number(depositTotal)}
        />

        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={Number(expensesTotal)}
        />
      </div>
    </div>
  )
}

export default SummaryCards
