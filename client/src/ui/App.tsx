import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import StockRequest from './Pages/StockRequest/StockRequest';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/stock-request" element={<StockRequest/>}/>
        {/* Add more routes as needed */}
        </Routes>
    </>
  )
}

export default App
