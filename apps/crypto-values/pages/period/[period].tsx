// El problema parece ser que no se rerenderiza la tabla al utilizar dynamic routes
// Posible solucion: utilizar shallow routing pero y usar un estado "period"
// Al setear el estado "period" la pagina se debería re-renderizar

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
// todo: react query as async server state manager
// todo: parametrize table dimension

import { CurrenciesMockRepository } from '../../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix3 } from '../../utils/functions'
import { useRouter } from 'next/router'
import GridTable2 from './GridTable2'
import styles from './page5.module.css'

export default function Page5({ period, table_dimension }) {
  const router = useRouter()
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList2 } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading, error } = useGetList2(period)
  const tableData = createRatiosMatrix3(currenciesDataList, +table_dimension)

  // console.table(tableData)
  // todo: remove
  // console.log('render----------------------------')
  // console.log(getFirstColumn(tableData))
  // console.log(tableData)
  // console.table(tableData)
  // console.log('process.browser', process.browser)
  // console.log('period state', periodState)

  // Pass query string parameter 'table_dimension' for debugging purposes
  // For example '?table_dimension=6' and inspect console
  table_dimension && console.table(table_dimension)

  const onChangePeriod = (period: string): Promise<boolean> =>
    void router.push(`/period/${period}`)

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <div className={styles.App}>
      <div>Dynamic route</div>
      <button onClick={() => onChangePeriod('1h')}>1 hour</button>
      <button onClick={() => onChangePeriod('24h')}>24 hours</button>
      <button onClick={() => onChangePeriod('7d')}>7 días</button>
      <button onClick={() => onChangePeriod('30d')}>30 días</button>
      <GridTable2 tableData={tableData} />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { period, table_dimension } = query
  return {
    props: {
      period,
      table_dimension: table_dimension ?? null,
    },
  }
}
