import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import { ArrowBack } from '@mui/icons-material'
import styles from './topappbar.module.css'

export default function TopAppBar() {
  const router = useRouter()
  const isCustomPeriodRoute = router.route === '/custom-period'
  const onClickBack = () => router.back()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isCustomPeriodRoute && (
            <IconButton
              sx={{ color: 'white' }}
              aria-label="back"
              onClick={onClickBack}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className={styles.padding}
          >
            Crypto Comparator
          </Typography>
          <Button color="inherit">By Yago López</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
