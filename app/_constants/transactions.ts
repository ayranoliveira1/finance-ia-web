export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: 'Educação',
  ENTERTAINMENT: 'Entretenimento',
  FOOD: 'Alimentação',
  HEALTH: 'Saúde',
  HOUSING: 'Moradia',
  OTHER: 'Outros',
  SALARY: 'Salário',
  TRANSPORTATION: 'Transporte',
  UTILITY: 'Utilidades',
}

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: 'Transferência bancária',
  BANK_SLIP: 'Boleto bancário',
  CASH: 'Dinheiro',
  CREDIT_CARD: 'Cartão de crédito',
  DEBIT_CARD: 'Cartão de débito',
  PIX: 'PIX',
  OTHER: 'Outros',
}

export const TRANSACTION_TYPE_OPTIONS = [
  { value: 'EXPENSE', label: 'Despesa' },
  { value: 'DEPOSIT', label: 'Depósito' },
  { value: 'INVESTMENT', label: 'Investimento' },
]

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: 'BANK_TRANSFER',
    label: TRANSACTION_PAYMENT_METHOD_LABELS['BANK_TRANSFER'],
  },
  {
    value: 'BANK_SLIP',
    label: TRANSACTION_PAYMENT_METHOD_LABELS['BANK_SLIP'],
  },
  {
    value: 'CASH',
    label: TRANSACTION_PAYMENT_METHOD_LABELS['CASH'],
  },
  {
    value: 'CREDIT_CARD',
    label: TRANSACTION_PAYMENT_METHOD_LABELS['CREDIT_CARD'],
  },
  {
    value: 'DEBIT_CARD',
    label: TRANSACTION_PAYMENT_METHOD_LABELS['DEBIT_CARD'],
  },
  {
    value: 'OTHER',
    label: TRANSACTION_PAYMENT_METHOD_LABELS['OTHER'],
  },
  {
    value: 'PIX',
    label: TRANSACTION_PAYMENT_METHOD_LABELS['PIX'],
  },
]

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: 'EDUCATION',
    label: TRANSACTION_CATEGORY_LABELS['EDUCATION'],
  },
  {
    value: 'ENTERTAINMENT',
    label: TRANSACTION_CATEGORY_LABELS['ENTERTAINMENT'],
  },
  {
    value: 'FOOD',
    label: TRANSACTION_CATEGORY_LABELS['FOOD'],
  },
  {
    value: 'HEALTH',
    label: TRANSACTION_CATEGORY_LABELS['HEALTH'],
  },
  {
    value: 'HOUSING',
    label: TRANSACTION_CATEGORY_LABELS['HOUSING'],
  },
  {
    value: 'OTHER',
    label: TRANSACTION_CATEGORY_LABELS['OTHER'],
  },
  {
    value: 'SALARY',
    label: TRANSACTION_CATEGORY_LABELS['SALARY'],
  },
  {
    value: 'TRANSPORTATION',
    label: TRANSACTION_CATEGORY_LABELS['TRANSPORTATION'],
  },
  {
    value: 'UTILITY',
    label: TRANSACTION_CATEGORY_LABELS['UTILITY'],
  },
]

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  ['CREDIT_CARD']: 'credit-card.svg',
  ['DEBIT_CARD']: 'debit-card.svg',
  ['BANK_TRANSFER']: 'bank-transfer.svg',
  ['BANK_SLIP']: 'bank-slip.svg',
  ['CASH']: 'money.svg',
  ['PIX']: 'pix.svg',
  ['OTHER']: 'other.svg',
}
