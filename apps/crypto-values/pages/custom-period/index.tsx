import { useState } from 'react'
import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix, logTableToConsole } from '../../utils/functions'
import { useRouter } from 'next/router'
import GridTable from '../../components/GridTable'

export default function CustomPeriod({
  start_date = 1610443814,
  end_date = 1624613414,
  table_dimension,
}) {
  const [refetchInterval] = useState<number>(0)
  const router = useRouter()
  const currenciesRepository = new CurrenciesRepository()
  const { useGetListCustomPeriod } = useRepository(
    currenciesRepository,
    refetchInterval
  )
  const {
    data: currenciesDataList,
    isLoading,
    error,
  } = useGetListCustomPeriod(start_date, end_date)
  const table = createRatiosMatrix(currenciesDataList, table_dimension)

  logTableToConsole(table, table_dimension)

  if (isLoading) return <>Loading...</>

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
      start_date: start_date ?? null,
      end_date: end_date ?? null,
      table_dimension: table_dimension ?? null,
    },
  }
}
