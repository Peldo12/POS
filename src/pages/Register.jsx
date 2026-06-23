import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import LabelLink from '../components/LabelLink'
import FieldInput from '../components/FieldInput'
import Button from '../components/Button'

import { Eye, EyeOff, User, Mail} from 'lucide-react'

import Validation from '../utils/Validation'
import customFetch from '../utils/api'

export default function Register({setToast}) {
  const [form, setForm] = useState({})
  const [passType, setPassType] = useState("password")
  const [isValid, setValidate] = useState({})
  const navigate = useNavigate()
  
  async function createUser(e) {
    try {
      if (!form.username) return setValidate(prev => ({...prev, username: Validation("Username")}))
      if (!form.email) return setValidate(prev => ({...prev, email: Validation("Email")}))
      if (!form.password) return setValidate(prev => ({...prev, password: Validation("Password")}))
      e.preventDefault()
      const res = await customFetch("/api/auth/register", "POST", form)
      localStorage.setItem("token", result.data.token)
      setToast({message: "User created, please login", type: "success"})
      navigate("/login")
    } catch (e) {
      setToast({message: e.message || "Failed connect to server", type: "error"})
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
    <div className="px-2.5 flex flex-col gap-2.5 justify-center items-center h-screen">
      <h1 className="text-2xl">REGISTER</h1>
      <FieldInput
        label="Username"
        name="username"
        value={form.username}
        icon={<User />}
        onChange={handleChange}
        error={isValid.username}
        ></FieldInput>
      <FieldInput 
        label="Email"
        name="email"
        type="email"
        value={form.email}
        icon={<Mail />}
        onChange={handleChange}
        error={isValid.email}
        ></FieldInput>
      <FieldInput 
        label="Password"
        name="password"
        type={passType}
        value={form.password}
        icon={passIcon}
        onChange={handleChange}
        error={isValid.password}
        ></FieldInput>
      <Button onClick={createUser}>Sign</Button>
      <LabelLink label="Have account ?" anchor="/login" togo="Login here"/>
    </div>
  )
}