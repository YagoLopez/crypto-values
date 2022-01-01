// todo: sticky header and column for currencies names
// todo: error control level api and component
// todo: add tests
// todo: make HOC Loader
// todo: add other char type

import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import GridTable from './GridTable'
import {
  generateRatiosMatrix,
  getCurrencyChangesVector,
  getCurrencyNamesVector,
} from '../../utils/functions'
import styles from './page4.module.css'

export default function Page4() {
  const currenciesRepository = new CurrenciesRepository()
  const { useGetList } = useRepository(currenciesRepository)
  const { data: currenciesList, isLoading } = useGetList()

  const currenciesChangesVector = getCurrencyChangesVector(currenciesList)
  const tableData = generateRatiosMatrix(currenciesChangesVector)
  const currenciesNamesVector = getCurrencyNamesVector(currenciesList)

  return (
    <div className={styles.App}>
      <GridTable />
    </div>
  )
}
