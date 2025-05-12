import { useState } from 'react'
// @ts-ignore
// import reactLogo from './assets/react.svg'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/login';
import AddStock from './Pages/AddStock';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<AddStock/>}/>
        <Route path="/login" element={<Login/>}/>
        </Routes>
    </>
  )
}

export default App
