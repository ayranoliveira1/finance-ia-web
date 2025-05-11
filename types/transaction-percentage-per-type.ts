import { TransactionType } from './enums'

export type TransactionPercentagePerType = {
  [key in TransactionType]: number
}
