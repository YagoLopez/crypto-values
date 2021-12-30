// todo: add tests
// todo: make HOC Loader
// todo: try branch with nextjs/pwa
// todo: storybook?
// todo: remove query-string npm package
// todo: add favico
// todo: add number of rowns and columns as info
// todo: preconnect to coin360.com domain
// todo: add fadeIn transition for page content
// todo: add currency choosable
// todo: small adjustments: make profilage and improve a bit performance,
// improve ui design, better responsiveness on mobile devices for example make fonts smaller
// add more tests
// todo: center text in first row and column

import { CurrenciesMockRepository } from '../../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix3 } from '../../utils/functions'
import { useRouter } from 'next/router'
import GridTable from './GridTable'
import styles from './page5.module.css'

export default function Page5({ period }) {
  const router = useRouter()
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList2 } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading, error } = useGetList2(+period)
  const tableData = createRatiosMatrix3(currenciesDataList)

  const onChangePeriod = (period: number): Promise<boolean> =>
    router.push(`/period/${period}`)

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <div className={styles.App}>
      <div>Dynamic route</div>
      <button onClick={() => onChangePeriod(1)}>1 hour</button>
      <button onClick={() => onChangePeriod(24)}>24 hours</button>
      <button onClick={() => onChangePeriod(48)}>48 hours</button>
      <button onClick={() => onChangePeriod(72)}>72 hours</button>
      <GridTable tableData={tableData} />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { period } = query
  return {
    props: {
      period,
    },
  }
}
