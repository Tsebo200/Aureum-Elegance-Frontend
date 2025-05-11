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
                  <div className={styles.horLine}></div>
                  <div className={styles.bottomSection}>
                    <div className={styles.spacer}></div>
                    <div className={styles.formContainer}>

                      <div className={styles.topContainer}>
                        <div className={styles.firstFormContainer}>
                          <h3 className={styles.itemHeading}>Item Request</h3>
                          <div className={styles.itemRequestForm}></div>
                        </div>
                        <div className={styles.secondFormContainer}>
                            <h3 className={styles.itemHeading}>Warehouse To</h3>
                            <div className={styles.WarehouseToForm}></div>
                        </div>
                        <div className={styles.thirdFormContainer}>
                            <h3 className={styles.itemHeading}>Warehouse From</h3>
                            <div className={styles.WarehouseFromForm}></div>
                        </div>
                      </div>

                      <div className={styles.middleContainer}>
                        <div className={styles.fourthFormContainer}>
                        <h3 className={styles.itemHeading}>Amount in kilograms or litres</h3>
                          <div className={styles.amountForm}></div>
                        </div>
                      </div>
                      <div className={styles.bottomContainer}>
                        <div className={styles.fifthFormContainer}>
                          <h4 className={styles.submitHeading}>Submit Stock Transfer</h4>
                          <div className={styles.amountForm}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
        </div>


      </div>
    </div>
  )
}

export default StockRequest