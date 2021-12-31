export const getTimestampInSeconds = (): number =>
  Math.floor(new Date().getTime() / 1000.0)

export const getTimestampFromDate = (date: string): number => {
  const datum = Date.parse(date)
  return datum / 1000
}
