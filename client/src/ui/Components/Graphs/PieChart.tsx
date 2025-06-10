import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

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
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(201, 203, 207, 0.5)',
    'rgba(255, 99, 255, 0.5)',
    'rgba(99, 255, 132, 0.5)',
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

  if (loading) return <p>Loading fragrance pie chart...</p>;

  return <Pie data={pieData} options={options} />;
}
