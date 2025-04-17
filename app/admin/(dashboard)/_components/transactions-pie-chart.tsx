// 'use client'

// import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
// import { Pie, PieChart } from 'recharts'

// import { Card, CardContent } from '@/components/ui/card'
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart'
// import PercentageItem from './percentage-item'

// const chartConfig = {
//   [TransactionType.INVESTMENT]: {
//     label: 'Investido',
//     color: '#FFFFFF',
//   },
//   [TransactionType.DEPOSIT]: {
//     label: 'Depósitos',
//     color: '#55B02E',
//   },
//   [TransactionType.EXPENSE]: {
//     label: 'Despesas',
//     color: '#E93030',
//   },
// } satisfies ChartConfig

// interface TransactionsPieChartProps {
//   typesPercentage: TransactionPercentagePerType
//   depositTotal: number
//   investmentTotal: number
//   expensesTotal: number
// }

// const TransactionsPieChart = ({
//   depositTotal,
//   investmentTotal,
//   expensesTotal,
//   typesPercentage,
// }: TransactionsPieChartProps) => {
//   const chartData = [
//     { type: TransactionType.DEPOSIT, amount: depositTotal, fill: '#55B02E' },
//     {
//       type: TransactionType.INVESTMENT,
//       amount: investmentTotal,
//       fill: '#FFFFFF',
//     },
//     { type: TransactionType.EXPENSE, amount: expensesTotal, fill: '#E93030' },
//   ]

//   return (
//     <Card className="flex flex-col p-6">
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartData}
//               dataKey="amount"
//               nameKey="type"
//               innerRadius={60}
//             />
//           </PieChart>
//         </ChartContainer>
//       </CardContent>

//       <div className="space-y-3">
//         <PercentageItem
//           icon={<TrendingUpIcon size={16} className="text-primary" />}
//           type="Receita"
//           percentage={typesPercentage.DEPOSIT}
//         />

//         <PercentageItem
//           icon={<TrendingDownIcon size={16} className="text-red-500" />}
//           type="Gastos"
//           percentage={typesPercentage.EXPENSE}
//         />

//         <PercentageItem
//           icon={<PiggyBankIcon size={16} />}
//           type="Investimentos"
//           percentage={typesPercentage.INVESTMENT}
//         />
//       </div>
//     </Card>
//   )
// }

// export default TransactionsPieChart
