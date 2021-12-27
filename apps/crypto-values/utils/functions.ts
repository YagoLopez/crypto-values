import { ICurrency } from '../models/currency/ICurrency'

export const round2Decimals = (num: number): number =>
  Math.round(num * 100) / 100

/**
 * Given a list with currency data coming from api response it returns an array
 * of change values
 *
 * Used to construct the ratios matrix used in the table shown to the user
 * @param currenciesList ICurrency[]
 * @retuns number[]
 */
export const getCurrencyChangesVector = (
  currenciesList: ICurrency[]
): number[] => currenciesList?.map((currency: ICurrency) => currency.ch)

/**
 * Given a currencies list it returns an array with currencies names
 *
 * Used to construct the ratios matrix
 * @param currenciesList ICurrency[]
 * @returns string[]
 */
export const getCurrencyNamesVector = (
  currenciesList: ICurrency[] = []
): string[] => currenciesList.map?.((currency) => currency.s)

export const createEmptyMatrix = (dimension: number): number[] => {
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

const isFirstCell = (i: number, j: number) => i === 0 && j === 0

const isFirstRow = (rowIndex: number, columnIndex): boolean =>
  rowIndex === 0 && columnIndex > 0

const isFirstColumn = (rowIndex: number, columnIndex): boolean =>
  rowIndex > 0 && columnIndex === 0

export const generateRatiosMatrix2 = (
  currenciesDataList: ICurrency[]
): number[] => {
  if (!currenciesDataList) return []
  currenciesDataList.unshift(null)
  const dimension = currenciesDataList?.length
  let ratiosMatrix = createEmptyMatrix(dimension)
  ratiosMatrix[0][0] = '-'
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      if (isFirstRow(i, j)) {
        ratiosMatrix[i][j] = currenciesDataList[j].s
      }
      if (isFirstColumn(i, j)) {
        ratiosMatrix[i][j] = currenciesDataList[i].s
      }
      if (!isFirstCell(i, j) && !isFirstRow(i, j) && !isFirstColumn(i, j)) {
        ratiosMatrix[i][j] = round2Decimals(
          currenciesDataList[j].ch / currenciesDataList[i].ch
        )
      }
    }
  }
  return ratiosMatrix
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
