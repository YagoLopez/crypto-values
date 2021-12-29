// todo: add tests
// todo: make HOC Loader
// todo: add other char type
// todo: try branch with nextjs/pwa
// todo: storybook?
// todo: remove query-string npm package
// todo: error boundaries
// todo: add favico

import { CurrenciesMockRepository } from '../../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix3 } from '../../utils/functions'
import styles from './page4.module.css'
import GridTable from './GridTable'

export default function Page5() {
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList2 } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading, error } = useGetList2(48)
  const tableData = createRatiosMatrix3(currenciesDataList)

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <div className={styles.App}>
      <GridTable tableData={tableData} />
    </div>
  )
}
