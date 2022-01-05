import { getUnixTime } from 'date-fns'

export const getTimestampFromDate = (date: string): number =>
  getUnixTime(new Date(date))
