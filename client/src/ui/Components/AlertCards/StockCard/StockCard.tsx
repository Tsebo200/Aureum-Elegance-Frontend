import styles from './StockCard.module.scss';
import type { Fragrance } from "../../../services/models/fragranceModel";
import { useEffect, useState } from 'react';
import { getFragrances } from '../../../services/FragranceServiceRoute';

function StockCard() {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);
  const [lowestFragrance, setLowestFragrance] = useState<Fragrance | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFragrances();

        // Sort fragrances by volume (ascending) and pick the first
        const sorted = [...data].sort((a, b) => a.volume - b.volume);
        const lowest = sorted[0];

        setFragrances(data);
        setLowestFragrance(lowest);
      } catch (error) {
        console.error("Error fetching fragrances:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {lowestFragrance ? (
        <div className={styles.cardContainer}>
          <h3 className={styles.lowStockHeading}>Lowest Stock</h3>
          <h3 className={styles.oilHeading}>{lowestFragrance.name}</h3>
          {/* <p className={styles.volumeText}>Volume: {lowestFragrance.volume}</p> */}
          <div className={styles.iconStatus}></div>
        </div>
      ) : (
        <div className={styles.cardContainer}>
          <p className={styles.noDataText}>No Fragrance Data Available.</p>
        </div>
      )}
    </div>
  );
}

export default StockCard;
