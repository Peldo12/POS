import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Status from '../components/Status'
import LabelNumber from '../components/LabelNumber'
import Loading from '../components/Loading'
import ThreeList from '../components/ThreeList'

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [items, setItems] = useState([])
  const [connect, setConnect] = useState("")
  
  const navigate = useNavigate()
  
  useEffect(() => {
    async function fetchStats() {
      try {
        let url = "/api/statistic/products"
        const res = await fetch(url)
        
        const data = await res.json()
        
        if (data.message !== "fail") {
          setConnect("Online")
          setStats(data.data)
        } else {
          setConnect("")
          setStats(null)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
        setConnect("")
        setStats(null)
      }
      
    }
    
    async function fetchProducts() {
      try {
        let url = "api/products"
        const res = await fetch(url)
        const data = await res.json()
        
        if (data.message !== "fail") {
          console.warn(data.message)
        }
        setItems(data.data || [])
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setItems([])
      }
    }
    
    fetchStats()
    fetchProducts()
  }, [])
  
  return (
    <div className="flex flex-col p-2.5 gap-2.5">
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-4xl">Dashboard</h1>
          <p>Welcome back, Admin</p>
        </div>
        <Status status={connect}/>
      </div>
      <div className="flex justify-between gap-2.5">
        <LabelNumber label="Products" num={stats?.products || 0} click={() => navigate("/products")}/>
        <LabelNumber label="Low" num={stats?.lowS || 0} />
        <LabelNumber label="Categories" num={stats?.categories || 0} />
        <LabelNumber label="Trash" num={stats?.trash || 0} />
      </div>
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xl">Stock Overview</h2>
        <HeaderProducts />
        <div>
          {(isLoading && <Loading />) || (items.length === 0 ? (
            <p>No items to show</p>
          ) :
          items.map(el => 
            <ThreeList key={el.id} first={el.name} second={el.price.toLocaleString()} third={el.stock}/>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeaderProducts() {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 text-center pb-2 border-b border-zinc-800">
      <span>Name</span>
      <span>Price</span>       
      <span>Stock</span>
    </div>
  )
}


export default Dashboard