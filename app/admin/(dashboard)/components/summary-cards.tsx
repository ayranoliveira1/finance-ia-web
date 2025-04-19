import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import SummaryCard from './summary-card'

interface SummaryCardsProps {
  balance: number
  depositTotal: number
  investmentTotal: number
  expensesTotal: number
  userCanAddTransaction?: boolean
}

const SummaryCards = async ({
  balance,
  depositTotal,
  investmentTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        userCanAddTransaction={userCanAddTransaction}
        icon={<WalletIcon size={18} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      <div className="grid grid-cols-[1.4fr,1fr,1fr] gap-6">
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
