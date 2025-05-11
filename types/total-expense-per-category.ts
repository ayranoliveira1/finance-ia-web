import { TransactionCategory } from './enums'

export interface TotalExpensePerCategory {
  category: TransactionCategory
  totalAmount: number
  percentageOfTotal: number
}
