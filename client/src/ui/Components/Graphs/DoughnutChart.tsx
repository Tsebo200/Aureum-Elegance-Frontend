import { useEffect, useState } from 'react';
import styles from './DoughnutChart.module.scss';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function DoughnutChart() {
  const [totals, setTotals] = useState({
    ingredients: 0,
    packaging: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const [ingredientsRes, packagingRes] = await Promise.all([
          fetch('http://localhost:5167/api/StockRequestIngredients'),
          fetch('http://localhost:5167/api/StockRequestPackagings'),
        ]);

        const ingredientsData = await ingredientsRes.json();
        const packagingData = await packagingRes.json();

        const totalIngredients = ingredientsData.reduce(
          (sum: number, item: any) => sum + (item.amountRequested || 0),
          0
        );

        const totalPackaging = packagingData.reduce(
          (sum: number, item: any) => sum + (item.amountRequested || 0),
          0
        );

        setTotals({
          ingredients: totalIngredients,
          packaging: totalPackaging,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock request totals:", error);
        setLoading(false);
      }
    };

    fetchTotals();
  }, []);

  const data = {
    labels: ['Ingredients', 'Packaging'],
    datasets: [
      {
        label: 'Total Stock Requested',
        data: [totals.ingredients, totals.packaging],
        backgroundColor: [
          '#B8222F',
          '#3C0806'
        ],
        borderWidth: 0 // removes outlines
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
        text: 'Total Stock Requested',
        font: {
          size: 15,
        },
      },
    },
  };

  return (
    <div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p>Loading chart...</p>
        </div>
      ) : (totals.ingredients === 0 && totals.packaging === 0 ? (
        <p>No stock requests found for ingredients or packaging.</p>
      ) : (
        <Doughnut data={data} options={options} />
      ))}
    </div>
  );
}

export default DoughnutChart;
