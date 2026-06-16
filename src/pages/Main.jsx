import { useEffect, useState } from 'react'

import ThreeList from '../components/ThreeList'

const Main = ({setToast}) => {
  const [products, setProducts] =  useState([])
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        let url = "/api/products"
        const res = await fetch(url)
        if (!res.ok) throw new Error("Server not responding")
        
        const data = await res.json()
        if (data.status !== "ok") return setToast({message: data.message, type: "warn"})
        
        setProducts(data.data)
      } catch (e) {
        setToast({message: e.message || "Server busy", type: "error"})
        setProducts([])
      }
    }
    fetchProducts()
  }, [])
  return (
    <div>
      {products.length === 0 
        ? null 
        : <div className="grid grid-cols-[2fr_1fr_1fr]">
          <span className="text-center">Name</span>
          <span className="text-center">Price</span>
          <span className="text-center">Stock</span>
        </div>}
      {products.length === 0 
        ? <p className="flex justify-center items-center">Products is empty</p> 
        : products.map((el, idx) => <ThreeList key={idx} first={el.name} second={el.price.toLocaleString()} third={el.stock}/>)}
    </div>
  )
}

export default Main