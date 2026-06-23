import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'

import { UserContext } from '../context/UserContext'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const [title, setTitle] = useState(null)
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  async function handleLogOut() {
    try {
      localStorage.removeItem("token")
      setUser(null)
      navigate("/login")
    } catch (e) {
      setUser(null)
    }
  }
  
  function handleRoute(url, text) {
    setTitle(prev => prev = text)
    navigate(url)
  }
  return (
    <>
      {/* Container utama Navbar */}
      <div className="fixed top-0 left-0 right-0 p-2.5 z-50 bg-white/50 backdrop-blur-md">
        <div className="grid grid-cols-[2fr_1fr_1fr]">
          <Menu
            size={40}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setOpen(prev => !prev)}
          />
          <p className="self-center font-semibold text-zinc-900">{title}</p>
          <p className="text-right self-center font-medium text-zinc-900">{user.username || "Guest"}</p>
        </div>
      </div>

      {/* Sidebar Dropdown */}
      <div
        className={`fixed top-16 left-2 w-52 bg-zinc-900 text-white border border-zinc-700 rounded-lg p-3 flex flex-col gap-3 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <p className="cursor-pointer hover:text-zinc-300 transition-colors" onClick={(e) => handleRoute("/dashboard", "Dashboard")}>Dashboard</p>
        <p className="cursor-pointer hover:text-zinc-300 transition-colors" onClick={(e) => handleRoute("/products", e.target.textContent)}>Inventory</p>
        <p className="cursor-pointer hover:text-zinc-300 transition-colors" onClick={(e) => handleRoute("/category", e.target.textContent)}>Categories</p>
        <p className="cursor-pointer hover:text-zinc-300 transition-colors" onClick={handleLogOut}>Log Out</p>
      </div>

      {/* Overlay Blur (Bisa diklik untuk tutup menu) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 h-screen transition-all"
          onClick={() => setOpen(false)} 
        />
      )}
    </>
  );
};

export default Navbar