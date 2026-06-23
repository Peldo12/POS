import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FieldInput from './FieldInput'
import Button from './Button'
import AppError from '../utils/AppError'

import { fieldIcons } from '../helpers/Icons'
import customFetch from '../utils/api'

const Modal = ({ title, show, field, setToast, setRefresh, isUpdate, initialData }) => {
  const defaultState = { sku: "", barcode: "", name: "", description: "", buying_price: "", price: "", category_id: "", stock: "", minimum_stock: "", weight: "", image: null }
  
  const [form, setForm] = useState(defaultState)
  useEffect(() => {
    if (isUpdate && initialData) {
      setForm(initialData)
    } else {
      setForm(defaultState)
    }
  }, [isUpdate, initialData])
  const navigate = useNavigate()
  function handleChange(e) {
    e.target.type !== "file" 
      ? setForm(prev => ({...prev, [e.target.name] 
      : e.target.value})) : setForm(prev => ({...prev, [e.target.name] : e.target.files[0]}))
  }
  
  async function handleSubmit() {
    try {
      const url = isUpdate ? `api/products/${form.id}/update` : "/api/products/create"
      const dataBox = new FormData()
      for (let key in form) {
        if (key === "id" || key === "created" || key === "updated" || key === "created_at" || key === "updated_at") continue
        if (form[key] !== null && form[key] !== "") {
          dataBox.append(key, form[key])
        }
      }
      
      const method = isUpdate ? "PUT" : "POST"
      const data = await customFetch(url, method, dataBox)
      show()
      setRefresh()
      isUpdate ? setToast({message: "Product has updated", type :"success"}) : setToast({message: "Product has added", type :"success"})
    } catch (e) {
      if (e.message === "Unexpected end of JSON input") return setToast({message: "Failed connect to server", type: "error"})
      setToast({message: e.message, type: "error"})
    }
  }
  
  return (
    <>
      <div className="w-screen h-screen fixed inset-0 flex flex-col justify-center items-center z-30 backdrop-blur-sm gap-2.5">
        <p className="text-2xl">{isUpdate ? "Update Product" : "Add Product" || "No Title"}</p>
        <div className="flex flex-wrap justify-center items-center gap-2.5 max-h-[70dvh] overflow-y-auto">
          {field.map((e, idx) => {
          const Icons = fieldIcons[e.name]
          return <FieldInput key={idx} label={e.name[0].toUpperCase() + e.name.slice(1)} type={e?.type || "text"} name={e.name} value={e.type === "file" ? undefined : (form[e.name] || "")} onChange={handleChange} icon={<Icons />} options={e.options} maxWidth={true}/>})}
        </div>
        <div className="flex justify-between w-[80dvw]">
          <Button onClick={() => show()}>Cancel</Button>
          <Button onClick={handleSubmit}>{isUpdate ? "Update" : "Add"}</Button>
        </div>
      </div>
    </>
  )
}

export default Modal