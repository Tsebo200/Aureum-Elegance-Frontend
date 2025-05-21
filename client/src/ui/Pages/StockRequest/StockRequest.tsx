import styles from './StockRequest.module.scss'
import Sidebar from '../../Components/Sidebar'
import { Button } from '@mui/material'
import WarehouseForm from '../../Components/Forms/StockRequest/WarehouseSelect'
import ItemRequestTextField from '../../Components/Forms/StockRequest/ItemRequestTextField'
import AmountTextField from '../../Components/Forms/StockRequest/AmountTextField'

function StockRequest() {
  return (
    <div>
      <div className={styles.mainContainer}>
        <Sidebar />
        <div className={styles.right}>
          <h1 className={styles.stockRequestHeading}>Stock Request</h1>
          <div className={styles.horLine}></div>
          <div className={styles.mainSection}>
            <div className={styles.spacer}></div>
            <div className={styles.formContainer}>

              <div className={styles.topContainer}>
                <div className={styles.firstFormContainer}>
                  <h3 className={styles.itemHeading}>Item Request</h3>
                  <div className={styles.itemRequestForm}><ItemRequestTextField /></div>
                </div>
                <div className={styles.secondFormContainer}>
                    <h3 className={styles.warehouseToHeading}>Warehouse To</h3>
                    <div className={styles.WarehouseToForm}><WarehouseForm /></div>
                </div>
                <div className={styles.thirdFormContainer}>
                    <h3 className={styles.warehouseFromHeading}>Warehouse From</h3>
                    <div className={styles.WarehouseFromForm}><WarehouseForm /></div>
                </div>
              </div>

              <div className={styles.middleContainer}>
                <div className={styles.fourthFormContainer}>
                <h3 className={styles.amountHeading}>Amount in kilograms or litres</h3>
                  <div className={styles.amountForm}>
                    <AmountTextField />
                  </div>
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <div className={styles.fifthFormContainer}>
                  <Button variant="contained" className={styles.submitBtn}>
                    Submit Stock Transfer
                  </Button>
                  <div className={styles.amountForm}></div>
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