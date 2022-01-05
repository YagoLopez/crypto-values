import styles from './loader.module.css'

export default function Loader({ text = 'Loading...' }) {
  return <div className={styles.container}>{`🧭 ${text}`}</div>
}
