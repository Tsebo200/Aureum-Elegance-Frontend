import styles from '../AlertCards/AlertCard.module.scss'
import ExpiryDate from './ExpiryDate/ExpiryDate'
import StockCard from './StockCard/StockCard'
import StockTransfer from './StockTransfer/StockTransfer'

function StatusCard() {
  return (
    <div>
      <div className={styles.mainContainer}>
          <StockCard/>
          <ExpiryDate/>
          <StockTransfer/>
      </div>
    </div>
  )
}

export default StatusCard