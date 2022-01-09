import styles from './loader.module.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className={styles.container}>
      <AccessTimeIcon className={styles.rotateCenter} />
      {`${text}`}
    </div>
  )
}
