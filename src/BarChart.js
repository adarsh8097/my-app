
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);
    
  const handleChart = async () => {
    if (!month) return;
    try {
      const response = await fetch(`http://localhost:5000/api/product/barChart?month=${month}`);
      const data = await response.json();
      console.log("Bar data", data);
      setChartData(data);
    } catch (error) {
      console.log("Data not found", error.message);
    }
  };

  useEffect(() => {
    handleChart();
  }, [month]);

  if (!chartData) return <div>Loading...</div>;

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: chartData.label,
        data: chartData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
