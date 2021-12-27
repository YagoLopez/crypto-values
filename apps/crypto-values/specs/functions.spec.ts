import {
  generateRatiosMatrix,
  generateRatiosMatrix2,
  createTableColumns,
  getCurrencyChangesVector,
  getCurrencyNamesVector,
  createEmptyMatrix,
  addCurrencyNamesToRatiosMatrix,
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

  it('Test generateRatiosMatrix2()', () => {
    const ratiosMatrix = generateRatiosMatrix2(currenciesList)
    console.log(ratiosMatrix)
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
})
