import { formatCurrency } from './currency'

describe('Currency', () => {
  it('should format currency', () => {
    const number = 1234567.89

    expect(formatCurrency(number)).toBe('R$ 1.234.567,89')
  })
})
