import './App.css'
import { Route, Routes } from 'react-router-dom'
import StockRequest from './Pages/StockRequest/StockRequest';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {

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
