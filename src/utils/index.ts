const timeDiff = (date: Date): [number, string] => {
  const now = new Date()

  const timeIntervals = [31536000, 2628000, 604800, 86400, 3600, 60, 1]
  const intervalNames = [
    'year',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
  ]
  const diff = Math.abs(now.getTime() - date.getTime()) / 1000
  const index = timeIntervals.findIndex(i => diff / i >= 1)
  const n = Math.floor(diff / timeIntervals[index])
  const interval = intervalNames[index]
  return [n, interval]
}

const localize = (value: number, str: string): string => {
  if (value !== 1) str += 's'
  return `${value} ${str} ago`
}

export const humanDiffDate = (date: Date): string => {
  return localize(...timeDiff(date))
}

export const isToday = (date: Date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}
