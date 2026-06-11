import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import FieldInput from "../components/FieldInput"
import Button from "../components/Button"
import LabelLink from "../components/LabelLink"

export default function Login() {
  const [message, setMessage] = useState(null)
  const [username, setUser] = useState("")
  const [password, setPass] = useState("")
  const navigate = useNavigate()
  
  async function isUser(e) {
    e.preventDefault()
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Connection": "keep-alive",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const result = await res.json()
    setMessage(result.message)
    if (result.status !== "ok") return
    
    localStorage.setItem("token", result.data.token)
    navigate("/main")
  }
  
  return (
    <div className="px-2.5 flex flex-col gap-2.5 justify-center items-center h-screen">
      <p>{message}</p>
      <h1 className="text-2xl">LOGIN</h1>
      <FieldInput label="Username" onChange={(event) => setUser(event.target.value)}></FieldInput>
      <FieldInput label="Password" type="password" onChange={(event) => setPass(event.target.value)}></FieldInput>
      <Button click={isUser}>Login</Button>
      <LabelLink label="Need account ?" anchor="/register" togo="Register"/>
    </div>
  )
}
