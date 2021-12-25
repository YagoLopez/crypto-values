import { ICurrency } from '../models/currency/ICurrency'

export const round2Decimals = (num: number): number =>
  Math.round(num * 100) / 100

export const getCurrencyChangesVector = (currencies: ICurrency[]): number[] =>
  currencies.map((currency: ICurrency) => currency.ch)

export const getCurrencyChangesVector2 = (
  currencies: ICurrency[]
): { name: string; change: number }[] =>
  currencies.map((currency: ICurrency) => ({
    name: currency.s,
    change: currency.ch,
  }))

export const initializeMatrix = (dimension: number): number[] => {
  const matrix = []
  for (let i = 0; i < dimension; i++) {
    matrix.push([])
  }
  return matrix
}

export const createChangesRatioMatrix = (
  currenciesChangesVector: number[]
): number[] => {
  const dimension = currenciesChangesVector.length
  const ratiosMatrix: number[] = initializeMatrix(dimension)
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      ratiosMatrix[i][j] = round2Decimals(
        currenciesChangesVector[i] / currenciesChangesVector[j]
      )
    }
  }
  return ratiosMatrix
}

export const getCurrencyNames = (data: ICurrency[] = []): string[] =>
  data.map?.((currency) => currency.s)

interface Header {
  Header: string
  accessor: string // accessor is the "key" in the data json
}

export const createTableColumns = (
  currenciesNamesVector: string[]
): Header[] => {
  return currenciesNamesVector.map(
    (currencyName: string, index: number): Header => {
      return {
        Header: currencyName,
        accessor: index.toString(),
      }
    }
  )
}
