import EnhancedTable from '@/components/Table/SessionsTable.tsx';
import styles from '@/pages/Sessions/Sessions.module.scss'

const Sessions = () => {
  return (
    <div className={styles.sessions}>
      <EnhancedTable
      />
    </div>
  )
}

export default Sessions
