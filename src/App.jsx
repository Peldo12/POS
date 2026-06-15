import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Toast from './components/Toast'

const App = () => {
  const [toast, setToast] = useState(null)
  return (
    <>
      <Toast toast={toast} setToast={setToast}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main setToast={setToast}/>} />
          <Route path="/login" element={<Login setToast={setToast}/>} />
          <Route path="/register" element={<Register setToast={setToast}/>} />
          <Route path="/dashboard" element={<Dashboard setToast={setToast}/>} />
          <Route path="/products" element={<Products setToast={setToast}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App