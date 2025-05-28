import { useEffect, useState } from 'react';
import styles from './ExpiryDate.module.scss'
import { getFragrances } from '../../../services/FragranceServiceRoute';
import type { Fragrance } from '../../../services/models/fragranceModel';


function ExpiryDate() {

  const [thirdFragrance, setThirdFragrance] = useState<Fragrance | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFragrances();

        // Set only the 3rd item if it exists - currently only fetching third item in the array
        if (data.length >= 3) {
          setThirdFragrance(data[2]);
        }
      } catch (error) {
        console.error("Error fetching fragrances:", error);
      }
    })();
  }, []);


  return (
    <div>
      {thirdFragrance ? (
        <div className={styles.cardContainer}>
          <h3 className={styles.lowStockHeading}>Expiry Date</h3>
          <h3 className={styles.oilHeading}>{thirdFragrance.name}</h3>
          <div className={styles.iconStatus}></div>
        </div>
      ) : (
        <div className={styles.cardContainer}></div> //Load this if no data is available
      )}
    </div>
  )
}

export default ExpiryDate