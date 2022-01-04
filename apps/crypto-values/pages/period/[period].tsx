// todo: layout
// todo: realtime toggle
// todo: pass lint
// todo: pass lighthouse audit
// todo: write docs
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
// todo: use global loading indicator from react query
// todo: use useCallback for user events
// Quality control:
// - Linting
// - Unit tests
// - E2E tests
// - TypeScript
// - Lighthouse audit
// todo: improvements: if the app is bigger it would be advisable to use a state manager library like Redux

import { SyntheticEvent, useState } from 'react'
import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix3, logTableToConsole } from '../../utils/functions'
import { useRouter } from 'next/router'
import GridTable from '../../components/GridTable'
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

import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import { getTimestampFromDate3 } from '../../utils/dates'

export default function Period({ period, table_dimension }) {
  const [refetchInterval, setRefetchInterval] = useState<number>(0)
  const [isOpenSelectPeriod, setIsOpenSelectPeriod] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<string>(null)
  const [endDate, setEndDate] = useState<string>(null)

  const router = useRouter()
  const currenciesRepository = new CurrenciesRepository()
  const { useGetList2 } = useRepository(currenciesRepository, refetchInterval)
  const { data: currenciesDataList, isLoading, error } = useGetList2(period)
  const table = createRatiosMatrix3(currenciesDataList, +table_dimension)

  logTableToConsole(table, table_dimension)

  const onChangePeriod = (e: SelectChangeEvent<typeof period>) =>
    void router.push(`/period/${e.target.value}`)

  const onClickSelectPeriodBtn = () => setIsOpenSelectPeriod(true)

  const onCloseSelectPeriodDialog = (
    event: SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== 'backdropClick') {
      setIsOpenSelectPeriod(false)
    }
  }

  const onChangeStartDate = (newDateValue: string) => {
    setStartDate(newDateValue)
    console.log(newDateValue)
    console.log('getTimestampFromDate3', getTimestampFromDate3(newDateValue))
  }

  const onChangeEndDate = (newDateValue) => {
    setEndDate(newDateValue)
    // todo: remove
    console.log('end date', endDate)
    const startTimestamp = getTimestampFromDate3(`${startDate}`)
    const endTimestamp = getTimestampFromDate3(`${newDateValue}`)

    void router.push(
      `/custom-period?start_date=${startTimestamp}&end_date=${endTimestamp}`
    )
  }

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={onClickSelectPeriodBtn}
          startIcon={<MoreTime />}
        >
          Select period
        </Button>

        <br />
        <br />

        <div>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={onChangeStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={onChangeEndDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <br />

        <Dialog
          disableEscapeKeyDown
          open={isOpenSelectPeriod}
          onClose={onCloseSelectPeriodDialog}
          style={{ height: '500px' }}
        >
          <DialogTitle>Select Operational Period</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Period</InputLabel>
                <Select
                  native
                  value={period}
                  onChange={onChangePeriod}
                  input={<OutlinedInput label="Period" id="select-period" />}
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

      <GridTable tableData={table} />
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
