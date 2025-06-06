import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styles from './DoughnutChart.module.scss';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

type Fragrance = {
  id: number;
  name: string;
  cost: number;
};

export function PieChart() {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFragrances = async () => {
      try {
        const res = await fetch('http://localhost:5167/api/Fragrance');
        const data = await res.json();
        setFragrances(data);
      } catch (err) {
        console.error('Error fetching fragrances:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFragrances();
  }, []);

  const colors = [
    '#B8222F',
    '#3C0806',
    '#8F1D27',
    '#69171E',
    '#821e1b',
    // '#8F1D27',
    // '#B8222F',
  ];

  const pieData = {
    labels: fragrances.map(f => f.name),
    datasets: [
      {
        label: 'Fragrance Cost',
        data: fragrances.map(f => f.cost),
        backgroundColor: colors.slice(0, fragrances.length),
        borderWidth: 0, // removes outlines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Fragrance Cost Breakdown',
        font: {
          size: 15,
        },
      },
    },
  };


  return(
    <div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p>Loading Pie Chart...</p>
        </div>
      ) : (
        <Pie data={pieData} options={options} />
      )}
    </div>
  );
}
