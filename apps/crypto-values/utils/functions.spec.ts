import {
  createChangesRatioMatrix,
  extractCurrencyChanges,
  initializeMatrix,
} from './functions'
import { MOCK_JSON } from './mock-json'
// import MOCK_JSON from '../pages/api/mock-data/db.json'

const { data } = MOCK_JSON

describe('Test utility fns', () => {
  describe('Test initializeMatrix()', () => {
    it('Dimension 0', () => {
      expect(initializeMatrix(0)).toEqual([])
    })

    it('Dimension 1', () => {
      expect(initializeMatrix(1)).toEqual([[]])
    })

    it('Dimension 2', () => {
      expect(initializeMatrix(2)).toEqual([[], []])
    })

    it('Dimension -1', () => {
      expect(initializeMatrix(-1)).toEqual([])
    })
  })

  it('Should extract currency changes from api json', () => {
    expect(extractCurrencyChanges(data)).toEqual([4.64, 3.26, -0.77, 3.8, 4.32])
  })

  it('Should create changes ratio matrix correctly', () => {
    const currenciesChangesVector = extractCurrencyChanges(data)
    const ratiosMatrix = createChangesRatioMatrix(currenciesChangesVector)
    console.log(ratiosMatrix)
  })
})
