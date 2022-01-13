import {
  createEmptyMatrix,
  filterInvalidCurrencies,
  createRatiosMatrix,
} from '../utils/functions'
import { MOCK_DATA } from '../utils/mock-data'
import { getCellStyle } from '../components/GridTable/GridTable'

const { data: currenciesList } = MOCK_DATA
const EXPECTED_MATRIX = [
  [
    '',
    { ch: 4.64, s: 'BTC' },
    { ch: 3.26, s: 'ETH' },
    { ch: -0.77, s: 'XRP' },
    { ch: 3.8, s: 'BCH' },
    { ch: 4.32, s: 'LTC' },
  ],
  [{ ch: 4.64, s: 'BTC' }, '-', 0.7, -0.17, 0.82, 0.93],
  [{ ch: 3.26, s: 'ETH' }, 1.42, '-', -0.24, 1.17, 1.33],
  [{ ch: -0.77, s: 'XRP' }, -6.03, -4.23, '-', -4.94, -5.61],
  [{ ch: 3.8, s: 'BCH' }, 1.22, 0.86, -0.2, '-', 1.14],
  [{ ch: 4.32, s: 'LTC' }, 1.07, 0.75, -0.18, 0.88, '-'],
]
const BACKGROUND_COLOR_GREEN = 'rgb(144, 238, 144, 0.1)'
const BACKGROUND_COLOR_RED = 'rgb(255, 0, 0, 0.1)'
const TEXT_SHADOW = '2px 2px 4px grey'

describe('Test utility fns', () => {
  console.log = jest.fn()
  console.error = jest.fn()

  describe('Test createEmptyMatrix()', () => {
    it('Dimension 0', () => {
      expect(createEmptyMatrix(0)).toEqual([])
    })

    it('Dimension 1', () => {
      expect(createEmptyMatrix(1)).toEqual([[]])
    })

    it('Dimension 2', () => {
      expect(createEmptyMatrix(2)).toEqual([[], []])
    })
  })

  describe('Test createRatiosMatrix() fn', () => {
    it('Without "table_dimension" parameter', () => {
      const ratiosMatrix = createRatiosMatrix(currenciesList)
      console.log(ratiosMatrix)
      expect(ratiosMatrix).toEqual(EXPECTED_MATRIX)
    })

    it('With "table_dimension" parameter"', () => {
      const ratiosMatrix = createRatiosMatrix(currenciesList, 6)
      console.log(ratiosMatrix)
      expect(ratiosMatrix).toEqual(EXPECTED_MATRIX)
    })
  })

  it('Test filterInvalidCurrencies()', () => {
    const res = filterInvalidCurrencies(currenciesList)
    expect(res).toEqual([
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
      {
        p: 457.02,
        pb: 0.008963601250582367,
        v: 139273748.55838403,
        mc: 8651503630.431273,
        mcr: 24,
        ch: 3.8,
        s: 'BCH',
        em: 18930018,
      },
      {
        p: 163.44,
        pb: 0.0032057145993911315,
        v: 369917948.0040253,
        mc: 11312330915.406221,
        mcr: 19,
        ch: 4.32,
        s: 'LTC',
        em: 69210057,
      },
    ])
  })

  describe('Test getCellStyle() fn', () => {
    it('Should return correct table cell style for -0.17 value ', () => {
      const result = getCellStyle(-0.17)
      expect(result).toEqual({
        backgroundColor: 'rgb(255, 0, 0, 0.17)',
        color: 'brown',
        textShadow: TEXT_SHADOW,
      })
    })

    it('Should return correct table cell style for -0.01 value ', () => {
      const result = getCellStyle(-0.01)
      expect(result).toEqual({
        backgroundColor: BACKGROUND_COLOR_RED,
        color: 'brown',
        textShadow: TEXT_SHADOW,
      })
    })

    it('Should return correct table cell style for -0.09 value ', () => {
      const result = getCellStyle(-0.09)
      expect(result).toEqual({
        backgroundColor: BACKGROUND_COLOR_RED,
        color: 'brown',
        textShadow: TEXT_SHADOW,
      })
    })

    it('Should return correct table cell style for 0.01 value ', () => {
      const result = getCellStyle(0.01)
      expect(result).toEqual({
        backgroundColor: BACKGROUND_COLOR_GREEN,
        color: '#38b438',
        textShadow: TEXT_SHADOW,
      })
    })

    it('Should return correct table cell style for 0.09 value ', () => {
      const result = getCellStyle(0.09)
      expect(result).toEqual({
        backgroundColor: BACKGROUND_COLOR_GREEN,
        color: '#38b438',
        textShadow: TEXT_SHADOW,
      })
    })

    it('Should return correct table cell style for 0.04 value ', () => {
      const result = getCellStyle(0.04)
      expect(result).toEqual({
        backgroundColor: BACKGROUND_COLOR_GREEN,
        color: '#38b438',
        textShadow: TEXT_SHADOW,
      })
    })
  })
})
