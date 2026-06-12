import { useState } from 'react'

import FieldInput from './FieldInput'
import Button from './Button'

const Modal = ({show}) => {
  const [item, setItem] = useState({})
 
 function handleChange(e) {
   setItem(prev => ({...prev, [e.target.name] : e.target.value}))
 }
  
  function handleAdd() {
    try {
      // let url = "/api/products/create"
      // const res = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(item)
      // })
      // const data = await res.json()
      // alert(data.message)
      // show()
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <div className="w-screen h-screen fixed inset-0 flex flex-col justify-center items-center z-10 backdrop-blur-sm gap-2.5">
      <FieldInput name="name" label="Name" onChange={handleChange}/>
      <FieldInput name="category" label="Category" onChange={handleChange}/>
      <FieldInput name="buy" label="Buy" onChange={handleChange}/>
      <FieldInput name="sell" label="Sell" onChange={handleChange}/>
      <FieldInput name="stock" label="Stock" onChange={handleChange}/>
      <Button click={handleAdd}>Add</Button>
    </div>
  )
}

export default Modal