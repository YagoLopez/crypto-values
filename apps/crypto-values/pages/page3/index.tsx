// todo: sticky header and column for currencies names
// todo: error control level api and component
// todo: add tests
// todo: make HOC Loader
// todo: add other char type

import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import {
  generateRatiosMatrix,
  createTableColumns,
  getCurrencyChangesVector,
  getCurrencyNamesVector,
} from '../../utils/functions'
import { FixedSizeGrid as Grid } from 'react-window'
import CSS from './page3.module.css'

export default function Page3() {
  const currenciesRepository = new CurrenciesRepository()
  const { useGetList } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading } = useGetList()

  const currenciesChangesVector = getCurrencyChangesVector(currenciesDataList)
  const tableData = generateRatiosMatrix(currenciesChangesVector)
  const currenciesNamesVector = getCurrencyNamesVector(currenciesDataList)

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={style}>{tableData?.[rowIndex]?.[columnIndex]}</div>
  )

  return (
    <div className={CSS.content}>
      {isLoading ? (
        'Loading...'
      ) : (
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
      )}
    </div>
  )
}
