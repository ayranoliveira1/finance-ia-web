import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from './enums'

export interface Transaction {
  id: string
  userId: string
  name: string
  type: TransactionType
  amount: number
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
  createdAt: Date
  updatedAt?: Date
}
