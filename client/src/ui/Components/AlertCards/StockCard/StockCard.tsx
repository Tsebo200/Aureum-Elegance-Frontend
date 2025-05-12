import styles from './StockCard.module.scss'

function StockCard() {
  return (
    <div>
        <div className={styles.cardContainer}>
          <h3 className={styles.lowStockHeading}>Low Stock</h3>
          <h3 className={styles.oilHeading}>Bergamot Oil</h3>
          <div className={styles.iconStatus}></div>
        </div>
        <div className={styles.cardContainer2}></div>
        <div className={styles.cardContainer3}></div>
    </div>
  )
}

export default StockCard