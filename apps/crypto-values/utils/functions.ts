import { ICurrency } from '../models/currency/ICurrency'

export const round2Decimals = (num: number): number =>
  Math.round(num * 100) / 100

export const getCurrencyChangesVector = (
  currenciesList: ICurrency[]
): number[] => currenciesList?.map((currency: ICurrency) => currency.ch)

export const createEmptyMatrix = (dimension: number): number[] => {
  const matrix = []
  for (let i = 0; i < dimension; i++) {
    matrix.push([])
  }
  return matrix
}

export const generateRatiosMatrix = (
  currenciesChangesVector: number[]
): number[] => {
  const dimension = currenciesChangesVector?.length
  const ratiosMatrix = createEmptyMatrix(dimension)
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      ratiosMatrix[i][j] = round2Decimals(
        currenciesChangesVector[i] / currenciesChangesVector[j]
      )
    }
  }
  return ratiosMatrix
}

export const getCurrencyNamesVector = (data: ICurrency[] = []): string[] =>
  data.map?.((currency) => currency.s)

// todo: review
interface Header {
  Header: string
  accessor: string
}

// todo: remove
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
