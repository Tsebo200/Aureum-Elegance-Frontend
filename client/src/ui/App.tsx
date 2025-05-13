import { useState } from 'react'
// @ts-ignore
// import reactLogo from './assets/react.svg'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/login';
import AddStock from './Pages/AddStock/AddStock';
import SMDelivery from './Pages/StockManagement/SMDeliveries';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<SMDelivery/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-stock" element={<AddStock/>}/>
        </Routes>
    </>
  )
}

export default App
