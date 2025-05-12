import styles from './StockTransfer.module.scss'

function StockTransfer() {
  return (
    <div>
        <div className={styles.cardContainer}>
          <h3 className={styles.lowStockHeading}>Stock Transfer <br/>Pending</h3>
          <h3 className={styles.oilHeading}>Stabilizer</h3>
          <div className={styles.iconStatus}></div>
        </div>
    </div>
  )
}

export default StockTransfer