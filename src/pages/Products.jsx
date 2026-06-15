import {useState, useEffect} from 'react'

import Loading from '../components/Loading'
import Modal from '../components/Modal'

const Products = ({setToast}) => {
  const [isModal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [products, setProducts] = useState([])
  const [detail, setDetail] = useState(false)
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        if (data.status !== "ok") {
          setProducts([])
          throw new Error(data.message)
        }
        
        setProducts(data.data)
      } catch (e) {
        setProducts([])
        setToast({message: e.message || "Failed connect to server", type: "error"})
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [refresh])
  
  return (
    <div className="p-2.5 min-h-dvh relative">
      {isLoading && <Loading />}
      {isModal && <Modal 
        title="Add Products" 
        show={() => setModal(false)} 
        field={[
          {name:"sku"},
          {name: "barcode"},
          {name: "name"},
          {name: "description"},
          {name: "buying_price", type: "number"},
          {name: "price", type: "number"},
          {name: "category_id", type: "number"},
          {name: "stock", type: "number"},
          {name: "minimum_stock", type: "number"},
          {name: "weight", type: "number"},
          {name: "image"}
        ]}
        setToast={setToast}
        setRefresh={() => setRefresh(prev => prev + 1)}
      />}
      <div className="flex justify-between items-center border border-gray-100 rounded p-1 ">
        <h1 className="text-4xl">Inventory</h1>
        <p className="text-lg">Admin</p>
      </div>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] m-2.5">
        <span className="text-center text-lg">Name</span>
        {detail && <span className="text-center">Category</span>}
        <span className="text-center text-lg">Buy</span>
        <span className="text-center text-lg">Sell</span>
        <span className="text-center text-lg">Stock</span>
        <span className="text-center text-lg">Action</span>
      </div>
      {
        products.length === 0 ? <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Add some products</p> : 
        products.map(el => <div key={el.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <span>{el.name}</span>
          {detail && <span className="text-center">{el.category}</span>}
          <span className="text-center">{el.buying_price.toLocaleString()}</span>
          <span className="text-center">{el.price.toLocaleString()}</span>
          <span className="text-center">{el.stock}</span>
          <span className="text-center">...</span>
        </div>)
      }
      <div className="flex justify-center items-center absolute right-3 bottom-3 text-4xl bg-green-600 rounded-full w-16 h-16 active:scale-95" onClick={() => setModal(true)}>+</div>
    </div>
  )
}

export default Products