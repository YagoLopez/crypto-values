import { ICurrency } from '../models/currency/ICurrency'

export const round2Decimals = (num: number): number =>
  Math.round(num * 100) / 100

export const getCurrencyChangesVector = (
  currenciesList: ICurrency[]
): number[] => currenciesList?.map((currency: ICurrency) => currency.ch)

export const getCurrencyNamesVector = (
  currenciesList: ICurrency[] = []
): string[] => currenciesList.map?.((currency) => currency.s)

export const createEmptyMatrix = (dimension: number): any[] => {
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

export const createRatiosMatrix2 = (currencies: ICurrency[]): number[] => {
  if (!currencies) return []
  currencies.unshift(null)
  const dimension = currencies?.length
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
        ratiosMatrix[i][j] = round2Decimals(
          currencies[j]?.ch / currencies[i]?.ch
        )
      }
    }
  }
  return ratiosMatrix
}

export const createRatiosMatrix3 = (
  currenciesDataList: ICurrency[] | Error,
  table_dimension: number = undefined
): any[][] => {
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
        ratiosMatrix[i][j] = round2Decimals(
          currencies[j]?.ch / currencies[i]?.ch
        )
      }
    }
  }
  return ratiosMatrix
}

// todo: remove
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

/**
 * (For testing purposes)
 * Pass to the url a query string parameter called 'table_dimension' to log
 * the table to te console. For example '?tableDimension=6'
 * @param table
 * @param tableDimension
 */
export const logTableToConsole = (
  table: any[][],
  tableDimension: number
): void => {
  tableDimension && console.table(table)
}
