import styles from './StockCard.module.scss';
import type { Fragrance } from "../../../services/models/fragranceModel";
import { useEffect, useState } from 'react';
import { getFragrances } from '../../../services/FragranceServiceRoute';

function StockCard() {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFragrances();
        console.log("Fetched fragrances:", data);
        setFragrances(data);
      } catch (error) {
        console.error("Error fetching fragrances:", error);
      }
    };

    fetchData();
  }, []);

  const secondFragrance = fragrances[1]; // get the second item

  return (
    <div>
      {secondFragrance ? (
        <div className={styles.cardContainer}>
          <h3 className={styles.lowStockHeading}>Low Stock</h3>
          <h3 className={styles.oilHeading}>{secondFragrance.name}</h3>
          <div className={styles.iconStatus}></div>
        </div>
      ) : (
        <div className={styles.cardContainer}></div> //Load this if no data is available
      )}
    </div>
  );
}

export default StockCard;
