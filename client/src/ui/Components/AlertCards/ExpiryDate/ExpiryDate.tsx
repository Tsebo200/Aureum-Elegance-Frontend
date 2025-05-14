import styles from './ExpiryDate.module.scss'

function ExpiryDate() {
  return (
    <div>
        <div className={styles.cardContainer}>
          <h3 className={styles.lowStockHeading}>Expiry Date</h3>
          <h3 className={styles.oilHeading}>Vanillin Powder</h3>
          <div className={styles.iconStatus}></div>
        </div>
    </div>
  )
}

export default ExpiryDate