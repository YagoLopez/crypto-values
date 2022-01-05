// todo: fix reset scrollbars
// todo: pass lighthouse audit
// todo: fix diagonal 1 problem
// todo: use useCallback for user events
// todo: preconnect to coin360.com domain
// todo: write docs
// DOCS
// react query as async server state manager
// - Data Abstraction Layer using Repository Pattern
// - Singleton Pattern for repositories to avoid creating new instances in each rerender
// Quality control:
// - Linting
// - Prettier (Code Formatting)
// - Unit tests
// - E2E tests
// - TypeScript
// - Lighthouse audit
// - On browser window focus data is refetches thanks to react-query
// todo: possible improvements: implement service worker for progressive web application
// todo: improvements: if the app is bigger it would be advisable to use a state manager library like Redux
// todo: improvements use storybooks for components
// todo: possible improvements: improve performance using dynamic imports with some mui components to improve performance
// todo: possible improvements: allow user to choose reference currency
// endpoint1 /api/crypto-currencies
// endpoint2 /api/mock-crypto-currencies
// run in sandbox
// todo: try branch with nextjs/pwa

import { SyntheticEvent, useState } from 'react'
import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { IRepository, useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix, logTableToConsole } from '../../utils/functions'
import { useRouter } from 'next/router'
import GridTable from '../../components/GridTable/GridTable'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { MoreTime } from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import { getTimestampFromDate } from '../../utils/dates'
import Switch from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'
import { useIsFetching } from 'react-query'
import styles from './period.module.css'
import Loader from '../../components/Loader/Loader'
import { ICurrency } from '../../models/currency/ICurrency'

interface IPeriodPage {
  period: string
  table_dimension: number
  currenciesRepository: IRepository<ICurrency, unknown>
}

export default function PeriodPage({
  period,
  table_dimension,
  currenciesRepository = new CurrenciesRepository(),
}: IPeriodPage) {
  const [refetchInterval, setRefetchInterval] = useState<number>(0)
  const { useGetList } = useRepository(currenciesRepository, refetchInterval)
  const { data: currenciesDataList, isLoading, error } = useGetList(period)
  const table = createRatiosMatrix(
    currenciesDataList as ICurrency[],
    +table_dimension
  )

  const [isOpenSelectPeriodDialog, setIsOpenSelectPeriodDialog] =
    useState<boolean>(false)
  const [startDate, setStartDate] = useState<string>(null)
  const [endDate, setEndDate] = useState<string>(null)
  const router = useRouter()
  const isBackgroundFetching = useIsFetching()
  const isRefetchActive = refetchInterval !== 0

  logTableToConsole(table, table_dimension)

  const onChangePeriod = (e: SelectChangeEvent<typeof period>) =>
    void router.push(`/period/${e.target.value}`)

  const onClickSelectPeriodBtn = () => setIsOpenSelectPeriodDialog(true)

  const onCloseSelectPeriodDialog = (
    event: SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== 'backdropClick') {
      setIsOpenSelectPeriodDialog(false)
    }
  }

  const onChangeStartDate = (newDateValue: string) => setStartDate(newDateValue)

  const onChangeEndDate = (newDateValue) => {
    setEndDate(newDateValue)
    const startTimestamp = getTimestampFromDate(`${startDate}`)
    const endTimestamp = getTimestampFromDate(`${newDateValue}`)
    void router.push(
      `/custom-period?start_date=${startTimestamp}&end_date=${endTimestamp}`
    )
  }

  const onToggleRefetchInterval = () =>
    refetchInterval === 0 ? setRefetchInterval(10000) : setRefetchInterval(0)

  const getRTtextStyle = (isRefetchActive: boolean) => {
    if (isBackgroundFetching) {
      return { background: 'cyan' }
    }
    if (isRefetchActive) {
      return { color: '#1976d2' }
    }
  }

  if (isLoading) return <Loader />

  if (error) return <>{`An error has occurred: ${(error as Error).message}`}</>

  return (
    <>
      <div className={styles.maincontainer}>
        <div>
          <Button
            className={styles.selectbtn}
            variant="contained"
            color="secondary"
            onClick={onClickSelectPeriodBtn}
            startIcon={<MoreTime />}
          >
            Select Period
          </Button>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={onChangeStartDate}
              renderInput={(params) => (
                <TextField
                  size="small"
                  className={styles.inputdate}
                  {...params}
                />
              )}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={onChangeEndDate}
              renderInput={(params) => (
                <TextField
                  size="small"
                  className={styles.inputdate}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div>
          <FormControlLabel
            control={
              <Switch
                checked={isRefetchActive}
                onChange={onToggleRefetchInterval}
                inputProps={{ 'aria-label': 'Real Time Data' }}
              />
            }
            label={
              <div style={getRTtextStyle(isRefetchActive)}>Real Time Data</div>
            }
          />
        </div>

        <Dialog
          disableEscapeKeyDown
          open={isOpenSelectPeriodDialog}
          onClose={onCloseSelectPeriodDialog}
          style={{ height: '500px' }}
        >
          <DialogTitle>Select Operational Period</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="period">Period</InputLabel>
                <Select
                  native
                  value={period}
                  onChange={onChangePeriod}
                  input={<OutlinedInput label="Period" id="period" />}
                >
                  <option aria-label="None" value="" />
                  <option value={'1h'}>1 hour</option>
                  <option value={'24h'}>24 hours</option>
                  <option value={'7d'}>7 days</option>
                  <option value={'30d'}>30 days</option>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseSelectPeriodDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className={styles.tablecontainer}>
        <GridTable tableData={table} />
      </div>
    </>
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
