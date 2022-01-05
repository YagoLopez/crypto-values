import { getUnixTime } from 'date-fns'

export const getTimestampFromDate3 = (date: string): number =>
  getUnixTime(new Date(date))
