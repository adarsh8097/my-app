import './App.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const [page, setPage] = useState(1);
  const [month, setMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [data, setData] = useState({ products: [] });
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/transactions?page=${page}&perpage=10&month=${month}`);
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.log("This is not found", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [page, month]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setPage(1); // Reset to first page when the month changes
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  console.log(typeof data);

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  console.log(months);

  // Filter data based on search query
  const filteredProducts = data.products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.price.toString().includes(searchQuery)
  );
   
   const handleStatics =()=>{
      navigate("/statistics");
   }
  return (
    <div className="App">
      <div className=''>
        <div className='bord'>
          <h5 style={{ marginRight: "10px", fontWeight: "bold", marginTop: "5px" }}>Transactions Dashboard</h5>
        </div>
        <div className='container d-flex p-4' style={{ justifyContent: "space-evenly" }}>
          <input 
            className='p-2' 
            type="text" 
            placeholder='Search transaction' 
            style={{ borderRadius: "0.5rem" }} 
            onChange={handleSearchChange} // Update search query on input change
          />
          <select 
            style={{ cursor: "pointer", borderRadius: "0.5rem", width: "200px", padding: "10px" }} 
            onChange={handleMonthChange}
          >
            <option value="">Select Month</option>
            {months.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>

          <button className='btn btn-primary' onClick={handleStatics}>Transaction Statistics</button>
        </div>

        <div className='table-responsive'>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody className='table-bordered'>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((d, index) => (
                  <tr key={index}>
                    <td>{d.id}</td>
                    <td>{d.title}</td>
                    <td className='d'>{d.description}</td>
                    <td>{d.price}</td>
                    <td>{d.category}</td>
                    <td>{d.sold ? "Yes" : "No"}</td>
                    <td><img src={d.image} alt="product-img" style={{ width: "100px" }} /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No data available for the selected month.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='container'>
          <button className='btn btn-primary' onClick={handleNextPage} disabled={data.products.length === 0}>Next</button>
          <button className='btn btn-secondary' onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
