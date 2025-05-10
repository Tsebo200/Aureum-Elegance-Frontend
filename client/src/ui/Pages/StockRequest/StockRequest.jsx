import React from 'react'
import styles from './StockRequest.module.scss'

function StockRequest() {
  return (
    <div >
      <div className={styles.mainContainer}>
        <div className={styles.left}>
        <div className={styles.navbar}></div>
                <div className={styles.right}>
                  <h1 className={styles.stockRequestHeading}>Stock Request</h1>
                </div>
        </div>


      </div>
    </div>
  )
}

export default StockRequest