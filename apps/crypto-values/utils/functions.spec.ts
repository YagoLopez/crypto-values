import {
  createChangesRatioMatrix,
  extractCurrencyChanges,
  initializeMatrix,
} from './functions'
import { MOCK_DATA } from './data'

const data = [
  {
    p: 50986.83,
    pb: 1,
    v: 10752638535.773203,
    mc: 963826083754.5444,
    mcr: 1,
    ch: 4.64,
    s: 'BTC',
    em: 18903431,
  },
  {
    p: 4084.54,
    pb: 0.08010986752955063,
    v: 6201076088.288375,
    mc: 485154467832.92773,
    mcr: 2,
    ch: 3.26,
    s: 'ETH',
    em: 118777993,
  },
  {
    p: 0.9724678936372803,
    pb: 0.000019072922010449783,
    v: 1300889789.2385857,
    mc: 45946478196.53701,
    mcr: 8,
    ch: -0.77,
    s: 'XRP',
    em: 47247295769,
  },
]

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
    expect(extractCurrencyChanges(MOCK_DATA)).toEqual([
      4.64, 3.26, -0.77, 3.8, 4.32,
    ])
  })

  it('Should create changes ratio matrix correctly', () => {
    const currenciesChangesVector = extractCurrencyChanges(data)
    const ratiosMatrix = createChangesRatioMatrix(currenciesChangesVector)
    console.log(ratiosMatrix)
  })
})
