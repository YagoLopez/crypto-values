import {
  generateRatiosMatrix,
  createRatiosMatrix2,
  createTableColumns,
  getCurrencyChangesVector,
  getCurrencyNamesVector,
  createEmptyMatrix,
  addCurrencyNamesToRatiosMatrix,
  filterInvalidCurrencies,
  createRatiosMatrix3,
} from '../utils/functions'
import { MOCK_DATA } from '../utils/mock-data'
// import MOCK_JSON from '../pages/api/mock-data/db.json'

const { data: currenciesList } = MOCK_DATA

describe('Test utility fns', () => {
  describe('Test initializeMatrix()', () => {
    it('Dimension 0', () => {
      expect(createEmptyMatrix(0)).toEqual([])
    })

    it('Dimension 1', () => {
      expect(createEmptyMatrix(1)).toEqual([[]])
    })

    it('Dimension 2', () => {
      expect(createEmptyMatrix(2)).toEqual([[], []])
    })

    it('Dimension -1', () => {
      expect(createEmptyMatrix(-1)).toEqual([])
    })
  })

  it('Should extract currency changes from api json', () => {
    expect(getCurrencyChangesVector(currenciesList)).toEqual([
      4.64, 3.26, -0.77, 3.8, 4.32,
    ])
  })

  it('Should create ratios matrix correctly', () => {
    const currenciesChangesVector = getCurrencyChangesVector(currenciesList)
    const ratiosMatrix = generateRatiosMatrix(currenciesChangesVector)
    console.log(ratiosMatrix)
  })

  it('Test createRatiosMatrix2()', () => {
    const currenciesListFiltered = filterInvalidCurrencies(currenciesList)
    const ratiosMatrix = createRatiosMatrix2(currenciesListFiltered)
    console.log(ratiosMatrix)
    expect(ratiosMatrix).toEqual([
      [
        '-',
        { ch: 4.64, s: 'BTC' },
        { ch: 3.26, s: 'ETH' },
        { ch: -0.77, s: 'XRP' },
        { ch: 3.8, s: 'BCH' },
        { ch: 4.32, s: 'LTC' },
      ],
      [{ ch: 4.64, s: 'BTC' }, 1, 0.7, -0.17, 0.82, 0.93],
      [{ ch: 3.26, s: 'ETH' }, 1.42, 1, -0.24, 1.17, 1.33],
      [{ ch: -0.77, s: 'XRP' }, -6.03, -4.23, 1, -4.94, -5.61],
      [{ ch: 3.8, s: 'BCH' }, 1.22, 0.86, -0.2, 1, 1.14],
      [{ ch: 4.32, s: 'LTC' }, 1.07, 0.75, -0.18, 0.88, 1],
    ])
  })

  it('Test createRatiosMatrix3()', () => {
    const ratiosMatrix = createRatiosMatrix3(currenciesList)
    console.log(ratiosMatrix)
    expect(ratiosMatrix).toEqual([
      [
        '-',
        { ch: 4.64, s: 'BTC' },
        { ch: 3.26, s: 'ETH' },
        { ch: -0.77, s: 'XRP' },
        { ch: 3.8, s: 'BCH' },
        { ch: 4.32, s: 'LTC' },
      ],
      [{ ch: 4.64, s: 'BTC' }, 1, 0.7, -0.17, 0.82, 0.93],
      [{ ch: 3.26, s: 'ETH' }, 1.42, 1, -0.24, 1.17, 1.33],
      [{ ch: -0.77, s: 'XRP' }, -6.03, -4.23, 1, -4.94, -5.61],
      [{ ch: 3.8, s: 'BCH' }, 1.22, 0.86, -0.2, 1, 1.14],
      [{ ch: 4.32, s: 'LTC' }, 1.07, 0.75, -0.18, 0.88, 1],
    ])
  })

  it.skip('Test extracting currency names', () => {
    const res = getCurrencyNamesVector(currenciesList)
    expect(res).toEqual([
      { Header: 'BTC', accessor: 's' },
      { Header: 'ETH', accessor: 's' },
      { Header: 'XRP', accessor: 's' },
      { Header: 'BCH', accessor: 's' },
      { Header: 'LTC', accessor: 's' },
    ])
  })
  it('Test createTableColumns()', () => {
    const currencyNamesVector = getCurrencyNamesVector(currenciesList)
    const res = createTableColumns(currencyNamesVector)
    expect(res).toEqual([
      { Header: 'BTC', accessor: '0' },
      { Header: 'ETH', accessor: '1' },
      { Header: 'XRP', accessor: '2' },
      { Header: 'BCH', accessor: '3' },
      { Header: 'LTC', accessor: '4' },
    ])
  })
  it('Test addCurrencyNamesToRatiosMatrix()', () => {
    const res = addCurrencyNamesToRatiosMatrix(currenciesList)
    console.log(res)
    // expect(res).toEqual([])
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
})
