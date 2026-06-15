import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PenLine } from 'lucide-react'

import { fieldIcons } from '../helpers/Icons'

import FieldInput from './FieldInput'
import Button from './Button'
import AppError from '../utils/AppError'

const Modal = ({ title, show, field, setToast, setRefresh }) => {
  const [form, setForm] = useState({})
  
  const navigate = useNavigate()
  function handleChange(e) {
   setForm(prev => ({...prev, [e.target.name] : e.target.value}))
 }
  
  async function handleAdd() {
    try {
      let url = "/api/products/create"
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Please login first")
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.status !== "ok") throw new Error(data.message)
      
      show()
      setRefresh()
      setToast({message: "Product has added", type :"success"})
    } catch (e) {
      setToast({message: e.message || "Failed connect to server", type: "error"})
    }
  }
  
  return (
    <>
      <div className="w-screen h-screen fixed inset-0 flex flex-col justify-center items-center z-40 backdrop-blur-sm gap-2.5">
        <p className="text-2xl">{title || "No Title"}</p>
        <div className="flex flex-wrap justify-center items-center gap-2.5 max-h-[70dvh] overflow-y-auto">
          {field.map((e, idx) => {
          const Icons = fieldIcons[e.name]
          return <FieldInput key={idx} label={e.name[0].toUpperCase() + e.name.slice(1)} type={e?.type || "text"} name={e.name} onChange={handleChange} icon={<Icons />} maxWidth={true}/>})}
        </div>
        <div className="flex justify-between w-[80dvw]">
          <Button click={() => show()}>Cancel</Button>
          <Button click={handleAdd}>Add</Button>
        </div>
      </div>
    </>
  )
}

export default Modal