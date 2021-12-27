// todo: sticky header and column for currencies names
// todo: error control level api and component
// todo: add tests
// todo: make HOC Loader
// todo: add other char type

import { CurrenciesMockRepository } from '../../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import GridTable from './GridTable'
import {
  generateRatiosMatrix,
  getCurrencyChangesVector,
  getCurrencyNamesVector,
} from '../../utils/functions'
import styles from './page4.module.css'

export default function Page4() {
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading } = useGetList()

  const currenciesChangesVector = getCurrencyChangesVector(currenciesDataList)
  const tableData = generateRatiosMatrix(currenciesChangesVector)
  const currenciesNamesVector = getCurrencyNamesVector(currenciesDataList)

  return (
    <div className={styles.App}>
      <GridTable />
    </div>
  )
}
