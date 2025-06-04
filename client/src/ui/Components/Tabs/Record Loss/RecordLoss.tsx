import styles from './RecordLoss.module.scss'
import RecordItem from '../../Forms/Record Loss/Item/RecordItem'
import QuantityForm from '../../Forms/Record Loss/Quantity Lost/QuantityForm'
import UserSelect from '../../Forms/Record Loss/Select/UserSelect'
import WarehouseSelect from '../../Forms/Record Loss/Select/WarehouseSelect'
import ReasonForm from '../../Forms/Record Loss/Reason/ReasonForm'
import RecordWasteBtn from '../../Forms/Record Loss/Button/RecordWasteBtn'
import ItemType from '../../Forms/Record Loss/Item Type/Itemtype'
import { useState } from 'react'

function RecordLoss() {
  const [itemType, setItemType] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    const basePayload = {
      quantityLoss: parseFloat(quantity),
      warehouseId: Number(warehouseId),
      userId: Number(userId),
      reason,
      dateOfLoss: new Date().toISOString()
    };

    let endpoint = '';
    let payload: any = {};

    switch (itemType) {
      case 'ingredient':
        payload = { ...basePayload, ingredientsId: Number(selectedItemId) };
        endpoint = 'http://localhost:5167/api/WasteLossRecordIngredients';
        break;
      case 'packaging':
        payload = { ...basePayload, packagingId: Number(selectedItemId) };
        endpoint = 'http://localhost:5167/api/WasteLossRecordPackaging';
        break;
      case 'fragrance':
        payload = { ...basePayload, fragranceId: Number(selectedItemId) };
        endpoint = 'http://localhost:5167/api/WasteLossRecordFragrance';
        break;
      case 'batchFinishedProduct':
        payload = { ...basePayload, batchFinishedProductId: Number(selectedItemId) };
        endpoint = 'http://localhost:5167/api/WasteLossRecordBatchFinishedProducts';
        break;
      default:
        alert('Invalid item type selected.');
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Something went wrong!');

      alert('Waste recorded successfully!');

      // ✅ Clear form after successful submission
      setItemType('');
      setSelectedItemId('');
      setQuantity('');
      setWarehouseId('');
      setUserId('');
      setReason('');
    } catch (error) {
      console.error('Failed to record waste:', error);
      console.log(payload);
      alert('Failed to record waste.');
    }
  };

  // ✅ Disable button unless all fields are filled
  const formIsValid =
    itemType !== '' &&
    selectedItemId !== '' &&
    quantity !== '' &&
    warehouseId !== '' &&
    userId !== '' &&
    reason.trim() !== '';

  return (
    <div>
      <h1>Record Loss</h1>
      <div className={styles.mainContainer}>
        <div className={styles.top}>
          <div className={styles.itemTypeBox}>
            <h2 className={styles.itemTypeHeading}>Item Type</h2>
            <ItemType value={itemType} onChange={setItemType} />
          </div>

          <div className={styles.itemBox}>
            <h2 className={styles.itemHeading}>Item</h2>
            <div className={styles.itemForm}>
              <RecordItem
                itemType={itemType}
                value={selectedItemId}
                onChange={setSelectedItemId}
              />
            </div>
          </div>

          <div className={styles.quantityBox}>
            <h2 className={styles.quantityHeading}>Quantity Lost</h2>
            <div className={styles.quantityForm}>
              <QuantityForm value={quantity} onChange={setQuantity} />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.reasonBox}>
            <h2 className={styles.reasonHeading}>Reason</h2>
            <div className={styles.reasonForm}>
              <ReasonForm value={reason} onChange={setReason} />
            </div>
          </div>

          <div className={styles.quantityBox}>
            <h2 className={styles.quantityHeading}>Warehouse</h2>
            <div className={styles.quantityForm}>
              <WarehouseSelect value={warehouseId} onChange={setWarehouseId} />
            </div>
          </div>

          <div className={styles.dateBox}>
            <h2 className={styles.dateHeading}>Users</h2>
            <div className={styles.dateForm}>
              <UserSelect value={userId} onChange={setUserId} />
            </div>
          </div>
        </div>

        <div className={styles.lastSection}>
          <div className={styles.recordBtn}>
            <RecordWasteBtn onClick={handleSubmit} disabled={!formIsValid} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordLoss;
