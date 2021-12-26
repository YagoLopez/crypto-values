// todo: sticky header and column for currencies names
// todo: error control level api and component
// todo: add tests
// todo: remove styles

import { CurrenciesMockRepository } from '../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import React, { useCallback, useRef, Fragment } from 'react'
import {
  createChangesRatioMatrix,
  createTableColumns,
  getCurrencyChangesVector,
  getCurrencyNames,
} from '../utils/functions'
// import { MOCK_DATA } from '../utils/mock-data'
import { FixedSizeGrid as Grid } from 'react-window'

export default function Page2() {
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading } = useGetList()
  // const { data: currenciesDataList } = MOCK_DATA

  const currenciesChangesVector = getCurrencyChangesVector(currenciesDataList)
  const tableData = createChangesRatioMatrix(currenciesChangesVector)
  const currenciesNamesVector = getCurrencyNames(currenciesDataList)

  // console.log(tableData)

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={style}>{tableData?.[rowIndex]?.[columnIndex]}</div>
  )

  return (
    <div>
      <Grid
        columnCount={3497}
        columnWidth={100}
        height={500}
        rowCount={3497}
        rowHeight={35}
        width={500}
      >
        {Cell}
      </Grid>
    </div>
  )
}
