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
// todo: use global loading indicator from react query
// todo: use useCallback for user events
// Quality control:
// - Linting
// - Unit tests
// - E2E tests
// - TypeScript
// - Lighthouse audit

import { SyntheticEvent, useState } from 'react'
import { CurrenciesMockRepository } from '../../models/currency/repositories/CurrenciesMockRepository'
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

export default function Page5({ period, table_dimension }) {
  const [refetchInterval, setRefetchInterval] = useState<number>(0)
  const [isOpenSelectPeriod, setIsOpenSelectPeriod] = useState<boolean>(false)

  const router = useRouter()
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList2 } = useRepository(currenciesRepository, refetchInterval)
  const { data: currenciesDataList, isLoading, error } = useGetList2(period)
  const table = createRatiosMatrix3(currenciesDataList, +table_dimension)

  // console.table(table)
  // todo: remove
  // console.log('render----------------------------')
  // console.log(getFirstColumn(table))
  // console.log(table)
  // console.table(table)
  // console.log('process.browser', process.browser)
  // console.log('period state', periodState)

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

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + (error as Error).message

  return (
    <>
      <CssBaseline />
      <div className={styles.App}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={onClickSelectPeriodBtn}
            startIcon={<MoreTime />}
          >
            Select period
          </Button>

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

        <GridTable2 tableData={table} />
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
