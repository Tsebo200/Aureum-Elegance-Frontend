
import './App.css'
import { Route, Routes } from 'react-router-dom'
import StockRequest from './Pages/StockRequest/StockRequest';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/login';
import AddStock from './Pages/AddStock';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/stock-request" element={<StockRequest/>}/>
        <Route path="/addStock" element={<AddStock/>}/>
        </Routes>
    </>
  )
}

export default App
