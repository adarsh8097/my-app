import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";

const HandleStatics = () => {
  const [data, setData] = useState('');
  const [month, setMonth] = useState('');
  const [month1, setMonth1] = useState('January');
  const handleStaticsdata = async () => {
    if (!month) return;
    try {
      const response = await fetch(`http://localhost:5000/api/product/statistics?month=${month}`);
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log("Error data not found", error.message);
    }
  };

  useEffect(() => {
    handleStaticsdata();
  }, [month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  console.log("amount data", data);
  return (
    <div>
      <h1>Statistics for Selected Month</h1>
      <div className="container bg-dark text-white w-50" style={{ marginTop: "10px" }}>
        <h2>Select Month</h2>
        <select onChange={handleMonthChange} value={month}>
          <option value="">Select month</option>
          {months.map((m, index) => (
            <option key={index} value={m}>{m}</option>
          ))}
        </select>
        <div className="card w-100" style={{ fontWeight: "bold", justifyContent: "center", alignItems: "center", padding: "10px" }}>
          <p>Total Sale - {data.totalSaleAmount || 0}</p>
          <p>Total Sold Items - {data.totalSoldItems || 0}</p>
          <p>Total Not Sold Items - {data.totalNotSoldItems || 0}</p>
        </div>
      </div>
      {/* <ProductionChart month={month} /> */}
      <BarChart month={month1} />
      <button onClick={() => setMonth1('February')}>Load February Data</button>
    </div>
  );
};

export default HandleStatics;

