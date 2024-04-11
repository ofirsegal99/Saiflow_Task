import { useParams } from "react-router-dom"
import getSessionByTransactionId from "@/utills/getSessionByTransactionId";
import EnhancedTable from '@/components/Table/TransactionsTable.tsx';
import styles from '@/pages/Transaction/Transaction.module.scss'

const Transaction = () => {
    let { transactionId } = useParams();
    const sessions = getSessionByTransactionId({transactionId});
    return (
      <div className={styles.transactions}>
        <h3 className={styles.transactions__title}>
          All OCPP Requests with a Transaction ID of 
          <span className={styles.transactions__title__span}>
          {` ${transactionId} `} 
            </span>
        </h3>
      <EnhancedTable
      data={sessions}
      />
    </div>
  )
}

export default Transaction