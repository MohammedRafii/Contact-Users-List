import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../main'
import toast from 'react-hot-toast'

export const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("/user/login", { email, password }, { headers: { "Content-Type": "application/json" }, withCredentials: true })
      setIsAuthenticated(true)
      toast.success(response.data.message)
      setLoading(false)
      setEmail("")
      setPassword("")
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
      setLoading(false)
      setPassword("")
    }
  }
  if (isAuthenticated) return <Navigate to={"/contacts"} />

  return (
    <div className='flex bg-black/15 justify-center items-center h-screen w-full'>
      <section className='mb-[2rem] shadow-xl xl:w-[35%] lg:w-[45%] w-[80%] xl:h-auto h-[60%]  rounded-lg bg-blue-400/45 text-center'>
        <h1 className='text-center py-6 font-semibold text-3xl underline underline-offset-4 '>Login</h1>
        <form onSubmit={submitHandler} className='flex flex-col justify-evenly h-[45vh]  xl:h-[75vh]'>
          <input
            className='bg-white/75 placeholder:text-black shadow-md outline-none rounded-xl px-[1rem] py-[1.2rem] mx-6'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            type="email"
            name="email"
            placeholder='Email'
            id="email" />
          <input className='bg-white/75 placeholder:text-black shadow-md outline-none rounded-xl px-[1rem] py-[1.2rem] mx-6' value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' id="password" />
          <button type="submit" disabled={loading} className='bg-blue-700/45 mx-auto px-10 font-semibold text-lg sm:text-xl w-[45%] py-2 rounded-xl text-white hover:scale-105 duration-200'>Login</button>
          <div className='font-medium flex items-center justify-center -m-3 w-full mx-auto '><hr className='w-[20%] border border-black/25' /> <span className='mx-3'> OR </span> <hr className='w-[20%] border border-black/25' /></div>
          <Link to={"/register"} className='border-x text-xs sm:text-base rounded-full border-black mx-auto px-10 font-medium py-3 w-[45%] h-[10px] flex items-center justify-center hover:scale-105 duration-200'>Sign Up</Link>
        </form>
      </section>
    </div>
  )
}
