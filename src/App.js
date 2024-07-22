import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./homePage";
import HandleStatics from "./Statistics";
import BarChart from "./BarChart";
function App(){

   return(
    <div className="App">
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/statistics" element={<HandleStatics/>}/>
          <Route path="/bar" element={<BarChart/>}/>
        </Routes>
    </div>
   );
}
export default App;