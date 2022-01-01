// todo: add tests
// todo: make HOC Loader
// todo: add other char type
// todo: try branch with nextjs/pwa
// todo: storybook?
// todo: remove query-string npm package
// todo: error boundaries
// todo: add favico

import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix3 } from '../../utils/functions'
import styles from './page5.module.css'
import GridTable from './GridTable'
import { useRouter } from 'next/router'

export default function Page5() {
  const router = useRouter()
  const currenciesRepository = new CurrenciesRepository()
  const { useGetList2 } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading, error } = useGetList2('24h')
  const tableData = createRatiosMatrix3(currenciesDataList)

  const onChangePeriod = (period: number): void => {
    router.push(`/page5/period/${period}`, undefined, { shallow: true })
  }
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <div className={styles.App}>
      <button onClick={() => onChangePeriod(1)}>1 day</button>
      <button onClick={() => onChangePeriod(24)}>24 days</button>
      <button onClick={() => onChangePeriod(48)}>48 days</button>
      <button onClick={() => onChangePeriod(72)}>72 days</button>
      <GridTable tableData={tableData} />
    </div>
  )
}
