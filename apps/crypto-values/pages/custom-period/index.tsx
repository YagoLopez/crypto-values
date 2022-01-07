import { useState } from 'react'
import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix, logTableToConsole } from '../../utils/functions'
import GridTable from '../../components/GridTable/GridTable'
import Loader from '../../components/Loader/Loader'
import { ICurrency } from '../../models/currency/ICurrency'
import { useRouter } from 'next/router'
import { IPageProps } from '../../models/IPageProps'

const tableContainer = {
  margin: '0.1em',
}

export default function CustomPeriodPage({
  currenciesRepository = new CurrenciesRepository(),
}: IPageProps) {
  const router = useRouter()
  const { start_date, end_date, table_dimension } = router.query
  const [refetchInterval] = useState<number>(0)
  const { useGetListCustomPeriod } = useRepository(
    currenciesRepository,
    refetchInterval
  )
  const {
    data: currenciesDataList,
    isLoading,
    error,
  } = useGetListCustomPeriod(+start_date, +end_date)
  const table = createRatiosMatrix(
    currenciesDataList as ICurrency[],
    +table_dimension
  )

  logTableToConsole(table, +table_dimension)

  if (isLoading) return <Loader />

  if (error) return <>{`An error has occurred: ${(error as Error).message}`}</>

  return (
    <div style={tableContainer}>
      <GridTable tableData={table} />
    </div>
  )
}
