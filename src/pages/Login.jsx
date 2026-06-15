import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import FieldInput from "../components/FieldInput"
import Button from "../components/Button"
import LabelLink from "../components/LabelLink"

import { Eye, EyeOff, User } from 'lucide-react'

import Validation from '../utils/Validation'

export default function Login({setToast}) {
  const [form , setForm] = useState({})
  const [passType, setPassType] = useState("password")
  const [isValid, setValidate] = useState({})
  const navigate = useNavigate()
  
  async function isUser(e) {
    try {
      if (!form.username) return setValidate(prev => ({...prev, username: Validation("Username")}))
      if (!form.password) return setValidate(prev => ({...prev, password: Validation("Password")}))
      
      e.preventDefault()
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Connection": "keep-alive",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      const result = await res.json()
      if (result.status !== "ok") return setToast({message: result.message, type: "warning"})
      
      localStorage.setItem("token", result.data.token)
      setToast({message: `Welcome ${form.username}`, type: "success"})
      navigate("/dashboard")
    } catch (e) {
      if (e.message === "Unexpected end of JSON input") return setToast({message: "Failed connect to server", type: "error"})
      setToast({message: e?.message , type: "error"})
    }
  }
  
  function handleChange(e) {
    const { name, value } = e.target
  
    setForm(prev => ({...prev, [name]: value}))
    setValidate(prev => ({...prev,[name]: ""}))
  }
  
  function handlePass() {
    setPassType(passType === "password" ? "text" : "password")
  }
  
  const passIcon = passType === "password" 
    ? <EyeOff onClick={handlePass}/> 
    : <Eye onClick={handlePass} />

  return (
    <div className="px-2.5 flex flex-col gap-2.5 justify-center items-center h-dvh">
      <h1 className="text-2xl">LOGIN</h1>
      <FieldInput 
        label="Username" 
        name="username"
        value={form.username}
        onChange={handleChange}
        icon={<User />}
        error={isValid?.username}
        isValid={isValid}
        setValidate={setValidate}
        ></FieldInput>
      <FieldInput
        label="Password"
        name="password"
        type={passType}
        value={form.password}
        onChange={handleChange}
        icon={passIcon}
        error={isValid?.password}
        isValid={isValid}
        setValidate={setValidate}
        ></FieldInput>
      <Button click={isUser}>Login</Button>
      <LabelLink label="Need account ?" anchor="/register" togo="Register"/>
    </div>
  )
}
