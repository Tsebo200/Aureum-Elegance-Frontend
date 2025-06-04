import React, { useState } from 'react';
import styles from './StockRequest.module.scss';
import Sidebar from '../../Components/Sidebar';
import { Button } from '@mui/material';

import StatusSelect from '../../Components/Forms/StockRequest/StatusSelect';
import UserTextField from '../../Components/Forms/StockRequest/UserTextField';
import IngredientsTextField from '../../Components/Forms/StockRequest/IngredientsTextField';
import AmountTextField from '../../Components/Forms/StockRequest/AmountTextField';

import { addStockRequestIngredient } from '../../services/StockRequestIngredientsServiceRoute';
import { addStockRequestPackaging } from '../../services/StockRequestPackagingServiceRoute';
import WarehouseSelect from '../../Components/Forms/StockRequest/WarehouseSelect';
import PackagingSelect from '../../Components/Forms/StockRequest/PackagingSelect';
import RequestType from '../../Components/Forms/StockRequest/RequestType';

function StockRequest() {
  const [formData, setFormData] = useState({
    requestType: 'ingredient', // default selected
    status: 'Pending',
    userId: '',
    ingredientsId: '',
    packagingId: '',
    warehouseId: '',
    amountRequested: '',
  });

  // Handle generic field change
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
  const commonData = {
    id: 0,
    amountRequested: Number(formData.amountRequested),
    status: formData.status,
    requestDate: new Date().toISOString(),
    userId: Number(formData.userId),
    warehouseId: Number(formData.warehouseId),
  };

  try {
    if (formData.requestType === 'ingredient') {
      const dataToSend = {
        ...commonData,
        ingredientsId: Number(formData.ingredientsId),
      };
      await addStockRequestIngredient(dataToSend);
      console.log(commonData)
    } else {
      const dataToSend = {
        ...commonData,
        packagingId: Number(formData.packagingId),
      };
      await addStockRequestPackaging(dataToSend);
    }

    alert('Stock Request submitted successfully!');
    // Reset form if needed
    setFormData({
      requestType: 'ingredient',
      status: '',
      userId: '',
      ingredientsId: '',
      packagingId: '',
      warehouseId: '',
      amountRequested: '',
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
                  <h3 className={styles.warehouseToHeading}>Request Type</h3>
                  <div className={styles.WarehouseToForm}>
                    <RequestType
                      value={formData.requestType}
                      onChange={(val) => handleChange('requestType', val)}
                    />               
                  </div>
                </div>

                <div className={styles.secondFormContainer}>
                  <div className={styles.itemRequestForm}>
                {/* Ingredients and Packaging Request Input - Toggle between the two when Stock Type is selected */}
                  {formData.requestType === 'ingredient' ? (
                    <>
                      <h3 className={styles.warehouseFromHeading}>Ingredient</h3>
                      <IngredientsTextField
                        value={formData.ingredientsId}
                        onChange={(val) => handleChange('ingredientsId', val)}
                      />
                    </>
                  ) : (
                    <>
                      <h3 className={styles.amountHeading}>Packaging</h3>
                      <PackagingSelect
                        value={formData.packagingId}
                        onChange={(val) => handleChange('packagingId', val)}
                      />
                    </>
                  )}
                  </div>
                </div>

                <div className={styles.thirdFormContainer}>
                  <h3 className={styles.warehouseFromHeading}>User</h3>
                  <div className={styles.WarehouseFromForm}>
                       <UserTextField
                      value={formData.userId}
                      onChange={(val) => handleChange('userId', val)}
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
                  <h3 className={styles.amountHeading}>Stock Quantity</h3>
                  <div className={styles.amountForm}>
                    <AmountTextField
                      value={formData.amountRequested}
                      onChange={(val) => handleChange('amountRequested', val)}
                    />
                  </div>
                </div>
                
              </div>
              

              <div className={styles.bottomContainer}>
                <div className={styles.fifthFormContainer}>
                  <Button
                  variant="contained"
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={
                    // If any of these states are empty or false must apply disable styling
                    !formData.userId ||
                    !formData.warehouseId ||
                    !formData.amountRequested ||
                    (formData.requestType === 'ingredient' && !formData.ingredientsId) ||
                    (formData.requestType === 'packaging' && !formData.packagingId)
                  }
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
