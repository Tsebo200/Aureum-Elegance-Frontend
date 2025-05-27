import { useEffect, useState } from 'react';
import styles from './DoughnutChart.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getFragrances } from '../../services/FragranceServiceRoute';
import type { Fragrance } from '../../services/models/fragranceModel';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFragrances();
        setFragrances(data);
      } catch (error) {
        console.error("Error fetching fragrances:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: fragrances.map(f => f.name),
    datasets: [
      {
        label: 'Fragrance Cost',
        data: fragrances.map(f => f.cost),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(199, 199, 199, 0.5)',
          'rgba(83, 102, 255, 0.5)',
          'rgba(255, 0, 102, 0.5)',
          'rgba(0, 255, 204, 0.5)'
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
  {fragrances.length === 0 ? (
  // <div className={styles.skeletonChart}>
      <div className={styles.loaderContainer}>
    <div className={styles.loader}></div>
    <p>Loading chart...</p>
  </div>
) : (
  <Doughnut data={data} />
)}

    </div>
  );
}

export default DoughnutChart;
