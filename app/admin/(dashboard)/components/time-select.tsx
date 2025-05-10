'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'

const MONTH_OPTIONS = [
  { value: '1', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

const YEAR_OPTIONS = [{ value: '2025', label: '2025' }]

const TimeSelect = () => {
  const { push } = useRouter()

  const handleMonthChange = (newMonth: string, newYear: string) => {
    push(`/admin/?month=${newMonth}&year=${newYear}`)
  }

  const searchParams = useSearchParams()
  const month = searchParams.get('month') ?? ''
  const year = searchParams.get('year') ?? ''

  return (
    <div className="flex items-center gap-4">
      <Select
        onValueChange={(newMonth) => handleMonthChange(newMonth, year)}
        defaultValue={month}
      >
        <SelectTrigger className="w-[150px] rounded-full">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(newYear) => handleMonthChange(newYear, month)}
        defaultValue={year}
      >
        <SelectTrigger className="w-[150px] rounded-full">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TimeSelect
