// BarChartComponent.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState(''); // Default month
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChart = async () => {
    if (!month) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/product/barChart?month=${month}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log("Bar data", data);
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: data.label,
            data: data.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.log("Data not found", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  useEffect(() => {
    handleChart();
  }, [month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Bar Chart Example</h1>
      <select onChange={handleMonthChange} value={month}>
        <option value="" disabled>Load month wise Data</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default BarChartComponent;
