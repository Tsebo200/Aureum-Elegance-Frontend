import styles from './RecordLoss.module.scss'
import ItemForm from '../../Forms/Record Loss/Item/ItemForm'
import QuantityForm from '../../Forms/Record Loss/Quantity Lost/QuantityForm'
import DateOfLoss from '../../Forms/Record Loss/Date of Loss/DateOfLoss'
import ItemType from '../../Forms/Record Loss/Item Type/Itemtype'
import ReasonForm from '../../Forms/Record Loss/Reason/ReasonForm'
import RecordWasteBtn from '../../Forms/Record Loss/Button/RecordWasteBtn'

function RecordLoss() {
  return (
    <div>
        <h1>Record Loss</h1>
                  <div className={styles.mainContainer}>
                    <div className={styles.top}>
                      <div className={styles.itemBox}>
                        <h2 className={styles.itemHeading}>Item</h2>
                        <div className={styles.itemForm}><ItemForm/></div>
                      </div>
                      <div className={styles.quantityBox}>
                        <h2 className={styles.quantityHeading}>Quantity Lost</h2>
                        <div className={styles.quantityForm}><QuantityForm/></div>
                      </div>
                      <div className={styles.dateBox}>
                        <h2 className={styles.dateHeading}>Date of Loss</h2>
                        <div className={styles.dateForm}><DateOfLoss/></div>
                      </div>
                    </div>
                    <div className={styles.bottom}>
                      <div className={styles.itemTypeBox}>
                        <h2 className={styles.itemTypeHeading}>Item Type</h2>
                        <div className={styles.itemTypeForm}><ItemType/></div>
                      </div>
                      <div className={styles.reasonBox}>
                        <h2 className={styles.reasonHeading}>Reason</h2>
                        <div className={styles.reasonForm}>
                          <ReasonForm/>
                        </div>
                      </div>
                      <div className={styles.recordBtn}>
                        <RecordWasteBtn/>
                        {/* <h3 className={styles.recordBtnText}>Record Waste Loss</h3> */}
                      </div>
                    </div>
                  </div>
    </div>
  )
}

export default RecordLoss