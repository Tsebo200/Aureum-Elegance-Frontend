import { useEffect, useState } from 'react';
import styles from './ExpiryDate.module.scss';
import { getFragrances } from '../../../services/FragranceServiceRoute';
import type { Fragrance } from '../../../services/models/fragranceModel';

function ExpiryDate() {
  const [closestExpiry, setClosestExpiry] = useState<Fragrance | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFragrances();

        // Sort fragrances by earliest expiry date
        const sorted = data
          .filter(f => f.expiryDate) // Ensure expiryDate exists
          .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

        if (sorted.length > 0) {
          setClosestExpiry(sorted[0]);
        }
      } catch (error) {
        console.error("Error fetching fragrances:", error);
      }
    })();
  }, []);

  return (
    <div>
      {closestExpiry ? (
        <div className={styles.cardContainer}>
          <h3 className={styles.lowStockHeading}>Expire Soon</h3>
          <h3 className={styles.oilHeading}>{closestExpiry.name}</h3>
          {/* <p className={styles.dateText}>
            Expires on: {new Date(closestExpiry.expiryDate).toLocaleDateString()}
          </p> */}
          <div className={styles.iconStatus}></div>
        </div>
      ) : (
        <div className={styles.cardContainer}>
          <p className={styles.noDataText}>No expiry data available.</p>
        </div>
      )}
    </div>
  );
}

export default ExpiryDate;
