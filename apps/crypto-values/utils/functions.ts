import { ICurrency } from '../models/currency/ICurrency'

export const round2Decimals = (num: number): number =>
  Math.round(num * 100) / 100

export const extractCurrencyChanges = (currenciesData: ICurrency[]): number[] =>
  currenciesData.map((currency: ICurrency) => currency.ch)

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
