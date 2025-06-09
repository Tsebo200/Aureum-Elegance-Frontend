import { useEffect, useState } from 'react';
import styles from './StockTransfer.module.scss';
import { getStockRequests } from '../../../services/StockRequestServiceRoute'; 
import type { StockRequestAdminDTO } from '../../../services/models/stockRequestAdminModel';

function StockTransfer() {
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);

  useEffect(() => {
    const fetchPendingStock = async () => {
      try {
        const ingredients = await getStockRequests('Ingredients');
        const packaging = await getStockRequests('Packagings');

        const allRequests: StockRequestAdminDTO[] = [...ingredients, ...packaging];

        const pendingTotal = allRequests
          .filter(r => r.status === 'Pending')
          .reduce((sum, r) => sum + r.amountRequested, 0);

        setPendingAmount(pendingTotal);
      } catch (error) {
        console.error('Error fetching pending stock requests:', error);
        setPendingAmount(0);
      }
    };

    fetchPendingStock();
  }, []);

  return (
    <div>
      {pendingAmount !== null ? (
        <div className={styles.cardContainer}>
          <h3 className={styles.lowStockHeading}>Stock Transfer<br />Pending</h3>
          <h3 className={styles.oilHeading}>{pendingAmount} units</h3>
          <div className={styles.iconStatus}></div>
        </div>
      ) : (
        <div className={styles.cardContainer}>
          <p className={styles.noDataText}>No Stock Transfer Data Available.</p>
        </div> // Optional loading state
      )}
    </div>
  );
}

export default StockTransfer;
