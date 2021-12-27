// todo: sticky header and column for currencies names
// todo: error control level api and component
// todo: add tests
// todo: make HOC Loader
// todo: add other char type
// todo: try branch with nextjs/pwa

import { CurrenciesMockRepository } from '../../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import {
  generateRatiosMatrix,
  createTableColumns,
  getCurrencyChangesVector,
  getCurrencyNamesVector,
} from '../../utils/functions'
import CSS from './page4.module.css'
import GridTable from './GridTable'

export default function Page5() {
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading } = useGetList()

  const currenciesChangesVector = getCurrencyChangesVector(currenciesDataList)
  const tableData = generateRatiosMatrix(currenciesChangesVector)
  const currenciesNamesVector = getCurrencyNamesVector(currenciesDataList)

  return (
    <div className={CSS.App}>
      {isLoading ? 'Loading...' : <GridTable tableData={tableData} />}
    </div>
  )
}
