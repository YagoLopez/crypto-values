// todo: fix diagonal problem

import { SyntheticEvent, useState } from 'react'
import { useRepository } from '@crypto-values/react-query-crud'
import { createRatiosMatrix, logTableToConsole } from '../../utils/functions'
import { useRouter } from 'next/router'
import GridTable from '../../components/GridTable/GridTable'
import { CurrenciesRepository } from '../../models/currency/repositories/CurrenciesRepository'
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
import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import { getTimestampFromDate } from '../../utils/dates'
import Switch from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'
import { useIsFetching } from 'react-query'
import Loader from '../../components/Loader/Loader'
import { ICurrency } from '../../models/currency/ICurrency'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import { IPageProps } from '../../models/IPageProps'

// Material UI does not allow applying styles as usual in Nextjs
// https://mui.com/customization/how-to-customize/
const selectBtn = {
  height: '36px',
  width: '150px',
  marginLeft: '5px',
  marginRight: '5px',
  marginTop: '15px',
}

const tableContainer = {
  margin: '0.1em',
}

const mainContainer = {
  textAlign: 'center' as const,
}

const inputDate = {
  width: '140px',
  marginLeft: '5px',
  marginRight: '5px',
  marginTop: '15px',
}

export default function PeriodPage({
  currenciesRepository = new CurrenciesRepository(),
}: IPageProps) {
  const router = useRouter()
  const { time, table_dimension } = router.query
  const [refetchInterval, setRefetchInterval] = useState<number>(0)
  const { useGetList } = useRepository(currenciesRepository, refetchInterval)
  const {
    data: currenciesDataList,
    isLoading,
    error,
  } = useGetList(time as string)
  const table = createRatiosMatrix(
    currenciesDataList as ICurrency[],
    +table_dimension
  )

  const [isOpenSelectPeriodDialog, setIsOpenSelectPeriodDialog] =
    useState<boolean>(false)
  const [startDate, setStartDate] = useState<string>(null)
  const [endDate, setEndDate] = useState<string>(null)
  const isBackgroundFetching = useIsFetching()
  const isRefetchActive = refetchInterval !== 0

  logTableToConsole(table, +table_dimension)

  const onChangePeriod = (e: SelectChangeEvent<typeof time>) =>
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

  const onChangeEndDate = (newDateValue: string) => {
    setEndDate(newDateValue)
    const startTimestamp = getTimestampFromDate(`${startDate}`)
    const endTimestamp = getTimestampFromDate(`${newDateValue}`)
    void router.push(
      `/custom-period?start_date=${startTimestamp}&end_date=${endTimestamp}`
    )
  }

  const onToggleRefetchInterval = () =>
    refetchInterval === 0 ? setRefetchInterval(10000) : setRefetchInterval(0)

  const getSwitchtextStyle = (isRefetchActive: boolean) => {
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
      <div style={mainContainer}>
        <div>
          <Button
            style={selectBtn}
            variant="outlined"
            onClick={onClickSelectPeriodBtn}
            startIcon={<AvTimerIcon />}
          >
            Select Period
          </Button>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={onChangeStartDate}
              renderInput={(params) => (
                <TextField size="small" style={inputDate} {...params} />
              )}
            />
            <DatePicker
              disabled={!startDate}
              label="End Date"
              value={endDate}
              onChange={onChangeEndDate}
              renderInput={(params) => (
                <TextField size="small" style={inputDate} {...params} />
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
              <div style={getSwitchtextStyle(isRefetchActive)}>
                Real Time Data
              </div>
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
                <InputLabel htmlFor="time">Period</InputLabel>
                <Select
                  native
                  value={time}
                  onChange={onChangePeriod}
                  input={<OutlinedInput label="Period" id="time" />}
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

      <div style={tableContainer}>
        <GridTable tableData={table} />
      </div>
    </>
  )
}
