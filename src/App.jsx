import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Toast from './components/Toast'
import RouteProtect from './pages/RouteProtect'

const App = () => {
  const [toast, setToast] = useState(null)
  return (
    <div className="select-none">
      <Toast toast={toast} setToast={setToast}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main setToast={setToast}/>} />
          <Route path="/login" element={<Login setToast={setToast}/>} />
          <Route path="/register" element={<Register setToast={setToast}/>} />
          <Route path="/dashboard" element={<RouteProtect>
            <Dashboard setToast={setToast}/></RouteProtect>} />
          <Route path="/products" element={<RouteProtect>
            <Products setToast={setToast}/></RouteProtect>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App