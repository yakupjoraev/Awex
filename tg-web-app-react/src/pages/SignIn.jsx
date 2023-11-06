import React, { useContext, useState } from 'react'
import axios from 'axios'
import cookies from '../services/cookies'
import { AppContext } from '../store'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../apis/Awex'

export default function SignIn() {
  const {config, site} = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const handleForm = async (e) => {
    setErrors([])
    const data = {email, password}
    try {
      const response = await signIn(data)
      if(response?.status == 200) {
        cookies.set("token", response?.data?.token)
        site.setToken(response?.data?.token)
        navigate('/')
      }
    } catch (err) {
      if(err?.response?.status == 401 && err?.response?.data?.errors) {
        setErrors(err?.response?.data?.errors)
      }
    }
  }

  return (
    <div>
      <h3>Sign in to AWEX</h3>
      {errors.map((error, i) => <em key={i}>{error}</em>)}
      <div>
        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value?.trim())} />
      </div>
      <div>
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value?.trim())} />
      </div>
      <button onClick={handleForm} disabled={!(email && password)}>Sign in</button>
    </div>
  )
}
