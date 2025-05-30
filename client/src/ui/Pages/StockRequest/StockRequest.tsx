import React, { useState } from 'react';
import styles from './StockRequest.module.scss';
import Sidebar from '../../Components/Sidebar';
import { Button } from '@mui/material';

import StatusSelect from '../../Components/Forms/StockRequest/StatusSelect';
import UserTextField from '../../Components/Forms/StockRequest/UserTextField';
import IngredientsTextField from '../../Components/Forms/StockRequest/IngredientsTextField';
import WarehouseTextField from '../../Components/Forms/StockRequest/WarehouseTextField';
import AmountTextField from '../../Components/Forms/StockRequest/AmountTextField';

import { addStockRequestIngredient } from '../../services/StockRequestIngredientsServiceRoute';
import WarehouseSelect from '../../Components/Forms/StockRequest/WarehouseSelect';

function StockRequest() {
  const [formData, setFormData] = useState({
    status: '',
    userId: '',
    ingredientsId: '',
    warehouseId: '',
    amountRequest: '',
  });

  // Handle generic field change
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Compose data with current ISO timestamp for requestDate
    const dataToSend = {
      ...formData,
      id: 0, // or omit if backend generates it
      requestDate: new Date().toISOString(),
      // Make sure to convert numeric fields from strings if needed:
      amountRequest: Number(formData.amountRequest),
      userId: Number(formData.userId),
      ingredientsId: Number(formData.ingredientsId),
      warehouseId: Number(formData.warehouseId),
    };

    try {
      await addStockRequestIngredient(dataToSend);
      alert('Stock Request submitted successfully!');
      // Clear form if needed:
      setFormData({
        status: '',
        userId: '',
        ingredientsId: '',
        warehouseId: '',
        amountRequest: '',
      });
    } catch (error) {
      console.error('Error submitting stock request:', error);
      alert('Failed to submit stock request.');
    }
  };

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
                  <h3 className={styles.warehouseToHeading}>Status Selection</h3>
                  <div className={styles.WarehouseToForm}>
                    <StatusSelect
                      value={formData.status}
                      onChange={(val) => handleChange('status', val)}
                    />
                  </div>
                </div>

                <div className={styles.secondFormContainer}>
                  <h3 className={styles.itemHeading}>User</h3>
                  <div className={styles.itemRequestForm}>
                    <UserTextField
                      value={formData.userId}
                      onChange={(val) => handleChange('userId', val)}
                    />
                  </div>
                </div>

                <div className={styles.thirdFormContainer}>
                  <h3 className={styles.warehouseFromHeading}>Ingredients</h3>
                  <div className={styles.WarehouseFromForm}>
                    <IngredientsTextField
                      value={formData.ingredientsId}
                      onChange={(val) => handleChange('ingredientsId', val)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.middleContainer}>
                <div className={styles.fourthFormContainer}>
                  <h3 className={styles.amountHeading}>Warehouse</h3>
                  <div className={styles.amountForm}>
                    <WarehouseSelect
                      value={formData.warehouseId}
                      onChange={(val) => handleChange('warehouseId', val)}
                    />
                  </div>
                </div>

                <div className={styles.fourthFormContainer}>
                  <h3 className={styles.amountHeading}>Amount in kilograms or litres</h3>
                  <div className={styles.amountForm}>
                    <AmountTextField
                      value={formData.amountRequest}
                      onChange={(val) => handleChange('amountRequest', val)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.bottomContainer}>
                <div className={styles.fifthFormContainer}>
                  <Button
                    variant="contained" className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={
                      !formData.status ||
                      !formData.userId ||
                      !formData.ingredientsId ||
                      !formData.warehouseId ||
                      !formData.amountRequest}
                      >
                    Submit Stock Request
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockRequest;
