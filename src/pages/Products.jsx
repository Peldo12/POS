import { useState, useEffect,useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Ellipsis } from 'lucide-react'

import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import Button from '../components/Button'

import customFetch from '../utils/api'
import { UserContext } from '../context/UserContext'

const Products = ({setToast}) => {
  const [search, setSearch] = useState("")
  const [refresh, setRefresh] = useState(0)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [detail, setDetail] = useState(false)
  const [subMenu, setSubmenu] = useState(null)
  const [initial, setInitial] = useState(null)
  const [remove, setRemove] = useState("")
  const [isModal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [isUpdate, setUpdate] = useState(false)
  
  const { user } = useContext(UserContext)
  
  const [searchParams] = useSearchParams()
  const filterType = searchParams.get("filter")
  
  const filteredProducts = products.filter(item => {
    if (filterType === "low") return item.stock <=item.minimum_stock
    const keyword = search.toLowerCase()
    const matchName = item?.name.toLowerCase().includes(keyword)
    const matchSku = item?.sku.toLowerCase().includes(keyword)
    return matchName || matchSku
  })
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await customFetch("/api/products")
        setProducts(data.data)
      } catch (e) {
        setProducts([])
        setToast({message: e.message || "Failed connect to server", type: "error"})
      } finally {
        setLoading(false)
      }
    }
    async function fetchCategories() {
      try {
        const data = await customFetch("/api/category")
        setCategories(data.data)
      } catch (e) {
        setCategories([])
        setToast({message: e.message || "Failed connect to server", type: "error"})
      }
    }
    fetchProducts()
    fetchCategories()
  }, [refresh])
  
  async function fetchProductsId(id) {
    try {
      const url = `/api/products/${id}`
      const data = await customFetch(url)
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
      const data = await customFetch(url, "PATCH")
      
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
      {/* SEARCH BAR UI */}
        <div className="mt-16 px-2.5">
          <input 
            type="text" 
            placeholder="Search product by name..." 
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 select-text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
          {name: "category_id", type: "select", options: categories},
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
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] pt-5 pb-2.5 border-b border-amber-200">
        <span className="text-center text-lg">Name</span>
        {detail && <span className="text-center">Category</span>}
        <span className="text-center text-lg">Buy</span>
        <span className="text-center text-lg">Sell</span>
        <span className="text-center text-lg">Stock</span>
        <span className="text-center text-lg">Action</span>
      </div>
      {/* Products List*/}
      {
        filteredProducts.length === 0 ? <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Not found any products</p> 
        : <div  className="overflow-y-auto flex flex-col gap-2.5 px-2.5 pt-2.5 pb-5 select-text">
          {filteredProducts.map(el => <div key={el.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2.5">
            <span>{el.name}</span>
            {detail && <span className="text-center">{el.category}</span>}
            <span className="text-center">{el.buying_price.toLocaleString()}</span>
            <span className="text-center">{el.price.toLocaleString()}</span>
            <span className={`text-center ${el.stock < el.minimum_stock ? "text-red-600 bold animate-pulse" : ""}`}>{el.stock}</span>
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
      {/* Add Button */}
      <div className="flex justify-center items-center absolute right-3 bottom-3 text-4xl bg-green-600 rounded-full w-16 h-16 active:scale-95" onClick={() => {setModal(true); setInitial(null)}}>+</div>
      {/* Delete Modal*/}
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