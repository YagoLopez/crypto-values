import { useState } from 'react'
import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { IRepository, useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix, logTableToConsole } from '../../utils/functions'
import GridTable from '../../components/GridTable'
import Loader from '../../components/Loader'
import { ICurrency } from '../../models/currency/ICurrency'

export default function CustomPeriod({
  start_date,
  end_date,
  table_dimension,
  currenciesRepository = new CurrenciesRepository(),
}: {
  start_date: number
  end_date: number
  table_dimension: number
  currenciesRepository: IRepository<ICurrency, unknown>
}) {
  const [refetchInterval] = useState<number>(0)
  const { useGetListCustomPeriod } = useRepository(
    currenciesRepository,
    refetchInterval
  )
  const {
    data: currenciesDataList,
    isLoading,
    error,
  } = useGetListCustomPeriod(start_date, end_date)
  const table = createRatiosMatrix(
    currenciesDataList as ICurrency[],
    table_dimension
  )

  logTableToConsole(table, table_dimension)

  if (isLoading) return <Loader />

  if (error) return <>{`An error has occurred: ${(error as Error).message}`}</>

  return (
    <>
      <GridTable tableData={table} />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { start_date, end_date, table_dimension } = query
  return {
    props: {
      start_date: start_date ?? 1610443814,
      end_date: end_date ?? 1624613414,
      table_dimension: table_dimension ?? null,
    },
  }
}
