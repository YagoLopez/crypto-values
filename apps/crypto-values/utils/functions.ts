import { ICurrency } from '../models/currency/ICurrency'

export const round2Decimals = (num: number): number =>
  Math.round(num * 100) / 100

export const createEmptyMatrix = (dimension: number): unknown[] => {
  const matrix = []
  for (let i = 0; i < dimension; i++) {
    matrix.push([])
  }
  return matrix
}

export const addCurrencyNamesToRatiosMatrix = (currenciesList: ICurrency[]) => {
  const dimension = currenciesList?.length
  const matrix = []
  for (let i = 0; i < dimension; i++) {
    matrix.push([])
  }
}

const isFirstCell = (i: number, j: number): boolean => i === 0 && j === 0

const isFirstRow = (i: number, j: number): boolean => i === 0 && j > 0

const isFirstColumn = (i: number, j: number): boolean => i > 0 && j === 0

const isSubmatrixRatios = (i: number, j: number): boolean =>
  !isFirstCell(i, j) && !isFirstRow(i, j) && !isFirstColumn(i, j)

export const filterInvalidCurrencies = (currencies: ICurrency[]): ICurrency[] =>
  currencies.filter((currency: ICurrency) => currency.ch !== 0)

export const createRatiosMatrix = (
  currenciesDataList: ICurrency[] | Error,
  table_dimension: number = undefined
): unknown[] => {
  if (!currenciesDataList) return
  const currencies = filterInvalidCurrencies(currenciesDataList as ICurrency[])
  currencies.unshift(null)
  const dimension = table_dimension ? table_dimension : currencies?.length
  const ratiosMatrix = createEmptyMatrix(dimension)
  ratiosMatrix[0][0] = '-'

  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      if (isFirstRow(i, j)) {
        ratiosMatrix[i][j] = {
          s: currencies[j]?.s,
          ch: currencies[j]?.ch,
        }
      }
      if (isFirstColumn(i, j)) {
        ratiosMatrix[i][j] = {
          s: currencies[i]?.s,
          ch: currencies[i]?.ch,
        }
      }
      if (isSubmatrixRatios(i, j)) {
        ratiosMatrix[i][j] =
          i == j ? '-' : round2Decimals(currencies[j]?.ch / currencies[i]?.ch)
      }
    }
  }
  return ratiosMatrix
}

/**
 * (For testing purposes)
 * Pass to the url a query string parameter called 'table_dimension' to log
 * the table to te console. For example '?tableDimension=6'
 * @param table
 * @param tableDimension
 */
export const logTableToConsole = (
  table: unknown[],
  tableDimension: number
): void => {
  tableDimension && console.table(table)
}
