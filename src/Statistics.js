import React, { useState } from "react";

 const HandleStatics =()=>{
    const [data,setData] = useState('');
    const handleStaticsdata =async()=>{
        try{
            await fetch('http://localhost:5000/api/product/statistics?month=June')
            .then((response)=>response.json())
            .then((data)=>{
                 console.log(data);
                //  setData(data);
            })
        }catch(error){
             console.log("Error data not found",error.message);
        }
    }

    handleStaticsdata()
    return(
        <div>
            <h1>Thi is new tage</h1>
            <div className="container bg-dark text-white w-50" style={{marginTop:"10px"}}>
                <h2>Statistics</h2>
             
                    <div className="card w-100 " style={{fontWeight:"bold",justifyContent:"center",alignItems:"center",padding:"10px"}} >
                        <p>Total sale - ${data}</p>
                        <p>Total sold item - ${data}</p>
                        <p>Total not sold item - ${data}</p>
                   
                </div>
            </div>
        </div>
    );
 }
 export default HandleStatics;