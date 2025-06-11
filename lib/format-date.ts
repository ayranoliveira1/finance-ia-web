export function formateDate(date: Date): string {
  if (!date) return ''

  const createdDate = new Date(date)
  const now = new Date()

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()

  const time = createdDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (isSameDay(createdDate, now)) {
    return `Hoje às ${time}`
  }

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  if (isSameDay(createdDate, yesterday)) {
    return `Ontem às ${time}`
  }

  const oldDate = createdDate.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  return `${oldDate} às ${time}`
}
