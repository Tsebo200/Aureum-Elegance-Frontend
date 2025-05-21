import { useState } from 'react'
// @ts-ignore
// import reactLogo from './assets/react.svg'
import './App.css';
import Login from './Pages/Login/login.js';
import AddStock from './Pages/AddStock/AddStock.js';
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Suppliers from './Pages/Suppliers/Suppliers.js';
import FinishedProducts from './Pages/FinishedProducts/FinishedProducts.js';
import WarehouseStock from './Pages/WarehouseStock.js';
import Dashboard from './Pages/Dashboard/Dashboard.js';
import StockRequest from './Pages/StockRequest/StockRequest.js';
import Employees from './Pages/Admin Management/Employees.js';

function App() {

  const Placeholder = ({ name}) => (
    <div>
      <h2>{name} Page</h2>
    </div>
  );
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finishedproducts" element={<FinishedProducts />} />
        <Route path="/stock-request" element={<StockRequest />} />
        <Route path="/add-stock" element={<AddStock />} />
        <Route path="/warehouse-stock" element={<WarehouseStock />} />
        <Route path="/admin-management" element={<Employees />} />
        <Route path="/stock-management" element={<Suppliers />} />
      </Routes>
      {/* <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App
