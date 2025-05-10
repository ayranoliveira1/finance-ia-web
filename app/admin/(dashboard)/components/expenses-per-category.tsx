import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TRANSACTION_CATEGORY_LABELS } from '@/constants/transactions'
import { formatCurrency } from '@/lib/currency'
import { TotalExpensePerCategory } from '@/types/total-expense-per-category'

interface ExpensePerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[]
}

const ExpensePerCategory = ({
  expensesPerCategory,
}: ExpensePerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-xl border pb-6">
      <CardHeader className="mt-4">
        <CardTitle className="font-bol">Gastos por categoria</CardTitle>
      </CardHeader>

      <div className="mx-6 mb-5 h-[1px] bg-white/10 mt-4"></div>

      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p>{category.percentageOfTotal}%</p>
            </div>

            <Progress value={category.percentageOfTotal} />

            <p>{formatCurrency(category.totalAmount)}</p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default ExpensePerCategory
