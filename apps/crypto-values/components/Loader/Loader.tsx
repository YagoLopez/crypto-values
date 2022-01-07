import styles from './loader.module.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className={styles.container}>
      <div style={{ marginRight: '5px', marginTop: '5px' }}>
        <AccessTimeIcon />
      </div>
      {`${text}`}
    </div>
  )
}
