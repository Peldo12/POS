import {useState, useEffect} from 'react'

import { Ellipsis } from 'lucide-react'

import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import Button from '../components/Button'

const Products = ({setToast}) => {
  const [isModal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [products, setProducts] = useState([])
  const [detail, setDetail] = useState(false)
  const [subMenu, setSubmenu] = useState(null)
  const [initial, setInitial] = useState(null)
  const [isUpdate, setUpdate] = useState(false)
  const [remove, setRemove] = useState("")
  
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
  
  async function fetchProductsId(id) {
    try {
      const url = `/api/products/${id}`
      const res = await fetch(url)
      if (!res.ok) throw new Error("Fail to get data")
      const data = await res.json()
      setInitial(data.data)
      setModal(true)
      setSubmenu(null)
    } catch (e) {
      setToast({message: e.message || "Failed connect to server", type: "error"})
    }
  }
  
  async function fetchProductDelete(id) {
    try {
      const url = `/api/products/${id}/delete`
      const token = localStorage.getItem("token")
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.status !== "ok") throw new Error(data.message)
      setRefresh(prev => prev + 1)
      setToast({message: "Products deletes", type: "success"})
      setRemove(null)
    } catch (e) {
      setToast({message: e.message || "Failed connect to server", type: "error"})
    }
  }
  
  function handleSubMenu(id) {
    setSubmenu(prev => (prev === id ? null : id) )
  }
  
  return (
    <div className="p-2.5 min-h-dvh relative">
      <Navbar />
      {isLoading && <Loading />}
      {isModal && <Modal 
        title={isUpdate ? "Update Products" : "Add Products"} 
        show={() => setModal(prev => !prev)} 
        field={[
          {name: "sku"},
          {name: "barcode"},
          {name: "name"},
          {name: "description"},
          {name: "buying_price", type: "number"},
          {name: "price", type: "number"},
          {name: "category_id", type: "number"},
          {name: "stock", type: "number"},
          {name: "minimum_stock", type: "number"},
          {name: "weight", type: "number"},
          {name: "image", type: "file"}
        ]}
        setToast={setToast}
        setRefresh={() => setRefresh(prev => prev + 1)}
        initialData={initial}
        isUpdate={isUpdate}
      />}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] pt-5 pb-2.5 mt-12 border-b border-amber-200">
        <span className="text-center text-lg">Name</span>
        {detail && <span className="text-center">Category</span>}
        <span className="text-center text-lg">Buy</span>
        <span className="text-center text-lg">Sell</span>
        <span className="text-center text-lg">Stock</span>
        <span className="text-center text-lg">Action</span>
      </div>
      {
        products.length === 0 ? <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Add some products</p> 
        : <div  className="overflow-y-auto flex flex-col gap-2.5 px-2.5 pt-2.5 pb-5 select-text">
          {products.map(el => <div key={el.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2.5">
            <span>{el.name}</span>
            {detail && <span className="text-center">{el.category}</span>}
            <span className="text-center">{el.buying_price.toLocaleString()}</span>
            <span className="text-center">{el.price.toLocaleString()}</span>
            <span className="text-center">{el.stock}</span>
            <div className="flex justify-center relative select-none" onClick={() => handleSubMenu(el.id)}>
              <Ellipsis />
              {subMenu === el.id && (
                <div className="flex flex-col absolute -top-3 -left-20 bg-white border border-gray-200 shadow-lg rounded-md z-10 w-24 overflow-hidden">
                  <span className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"onClick={(e) => { e.stopPropagation; fetchProductsId(el.id); setUpdate(true) }}>Update</span>
                  <span className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer" onClick={() => {setRemove(el)}}>Delete
                  </span>
                </div>)}
            </div>
          </div>)
        }</div>
      }
      <div className="flex justify-center items-center absolute right-3 bottom-3 text-4xl bg-green-600 rounded-full w-16 h-16 active:scale-95" onClick={() => {setModal(true); setInitial(null)}}>+</div>
      {remove && (
        <div className="w-screen h-screen fixed inset-0 flex justify-center items-center z-[90] backdrop-blur-sm bg-black/20">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-800">Delete Product</h3>
            <p className="text-gray-600">
              Are you sure you want to delete <span className="font-bold text-red-600">"{remove.name}"</span>?
            </p>
            
            <div className="flex justify-end gap-3 mt-2">
              <Button click={() => setRemove(null)}>Cancel</Button>
              <Button warning={true} click={() => fetchProductDelete(remove.id)} >Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products