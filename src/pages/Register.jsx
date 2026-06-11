import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import LabelLink from '../components/LabelLink'
import FieldInput from '../components/FieldInput'
import Button from '../components/Button'

export default function Register() {
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const navigate = useNavigate()
  
  async function createUser(e) {
    e.preventDefault()
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Connection": "keep-alive",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    const result = await res.json()
    setMessage(result.message)
    
    if (result.status !== "ok") return
    
    localStorage.setItem("token", result.data.token)
    navigate("/")
  }
  
  return (
    <div className="px-2.5 flex flex-col gap-2.5 justify-center items-center h-screen">
      <p>{message}</p>
      <h1 className="text-2xl">REGISTER</h1>
      <FieldInput label="Username" onChange={(event)=> setUsername(event.target.value)}></FieldInput>
      <FieldInput label="Email" type="email" onChange={(event) => setEmail(event.target.value)}></FieldInput>
      <FieldInput label="Password" type="password" onChange={(event) => setPassword(event.target.value)}></FieldInput>
      <Button click={createUser}>Sign</Button>
      <LabelLink label="Have account ?" anchor="/" togo="Login here"/>
    </div>
  )
}