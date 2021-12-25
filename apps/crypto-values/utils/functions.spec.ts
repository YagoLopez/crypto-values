import {
  createChangesRatioMatrix,
  createTableColumns,
  getCurrencyChangesVector,
  getCurrencyChangesVector2,
  getCurrencyNames,
  initializeMatrix,
} from './functions'
import { MOCK_DATA } from './mock-data'
// import MOCK_JSON from '../pages/api/mock-data/db.json'

const { data } = MOCK_DATA

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
    expect(getCurrencyChangesVector(data)).toEqual([
      4.64, 3.26, -0.77, 3.8, 4.32,
    ])
  })

  it('Should create changes ratio matrix correctly', () => {
    const currenciesChangesVector = getCurrencyChangesVector(data)
    const ratiosMatrix = createChangesRatioMatrix(currenciesChangesVector)
    console.log(ratiosMatrix)
  })

  it('Test extracting currency names', () => {
    const res = getCurrencyNames(data)
    expect(res).toEqual([
      { Header: 'BTC', accessor: 's' },
      { Header: 'ETH', accessor: 's' },
      { Header: 'XRP', accessor: 's' },
      { Header: 'BCH', accessor: 's' },
      { Header: 'LTC', accessor: 's' },
    ])
  })
  it('Test getCurrenciesChangeVector2()', () => {
    const res = getCurrencyChangesVector2(data)
    console.log(res)
  })
  it('Test createTableColumns()', () => {
    const currencyNamesVector = getCurrencyNames(data)
    const res = createTableColumns(currencyNamesVector)
    expect(res).toEqual([
      { Header: 'BTC', accessor: '0' },
      { Header: 'ETH', accessor: '1' },
      { Header: 'XRP', accessor: '2' },
      { Header: 'BCH', accessor: '3' },
      { Header: 'LTC', accessor: '4' },
    ])
  })
})
