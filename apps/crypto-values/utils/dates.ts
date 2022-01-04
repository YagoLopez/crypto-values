// todo: rename and clear fns
import { getUnixTime } from 'date-fns'

export const getTimestampInSeconds = (): number =>
  Math.floor(new Date().getTime() / 1000.0)

export const getTimestampFromDate = (date: string): number => {
  const datum = Date.parse(date)
  return datum / 1000
}

// todo: remove
export const getTimestampFromDate2 = (date: string): number => {
  const datum = Date.parse(date)
  return getUnixTime(datum)
}

export const getTimestampFromDate3 = (date: string): number =>
  getUnixTime(new Date(date))
