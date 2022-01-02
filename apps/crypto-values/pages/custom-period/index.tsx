import { SyntheticEvent, useState } from 'react'
import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix3, logTableToConsole } from '../../utils/functions'
import { useRouter } from 'next/router'
import GridTable2 from './GridTable2'
import styles from './page5.module.css'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CssBaseline from '@mui/material/CssBaseline'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { MoreTime } from '@mui/icons-material'

export default function CustomPeriod({
  start_date = 1610443814,
  end_date = 1624613414,
  table_dimension,
}) {
  const [refetchInterval, setRefetchInterval] = useState<number>(0)
  const [isOpenSelectPeriod, setIsOpenSelectPeriod] = useState<boolean>(false)

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
  const table = createRatiosMatrix3(currenciesDataList, table_dimension)

  console.log(start_date)
  // todo: remove
  // console.log('render----------------------------')
  // console.log(getFirstColumn(table))
  // console.log(table)
  // console.table(table)
  // console.log('process.browser', process.browser)
  // console.log('period state', periodState)

  logTableToConsole(table, table_dimension)

  // const onChangePeriod = (e: SelectChangeEvent<typeof period>) =>
  //   void router.push(`/period/${e.target.value}`)

  const onClickSelectPeriodBtn = () => setIsOpenSelectPeriod(true)

  const onCloseSelectPeriodDialog = (
    event: SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== 'backdropClick') {
      setIsOpenSelectPeriod(false)
    }
  }

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <>
      <CssBaseline />
      <div className={styles.App}>
        <GridTable2 tableData={table} />
      </div>
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
