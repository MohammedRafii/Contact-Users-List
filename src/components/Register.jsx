import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'

export const Register = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("/user/new", { name, email, password }, { headers: { "Content-Type": "application/json" }, withCredentials: true })
      // console.log(response)
      toast.success(response.data.message)
      setIsAuthenticated(true)
      setLoading(false)
      setName("")
      setEmail("")
      setPassword("")
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
      setLoading(false)
      setEmail("")
      setPassword("")
    }
  }
  if (isAuthenticated) return <Navigate to={"/contacts"} />
  return (
    <div className='flex bg-black/15 justify-center items-center h-screen w-full'>
      <section className='mb-[2rem] shadow-xl rounded-lg bg-green-400/45 text-center xl:w-[35%] lg:w-[45%] w-[80%] xl:h-auto h-[70%]'>
        <h1 className='text-center py-6 font-semibold text-3xl underline underline-offset-4'>Sign Up</h1>
        <form onSubmit={submitHandler} className='flex flex-col justify-evenly h-[55vh]  xl:h-[75vh]'>
          <input className='bg-black/15 placeholder:text-black outline-none rounded-xl shadow-md px-[1rem] py-[1.2rem] mx-6' value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder='Name' id="name" />
          <input className='bg-black/15 placeholder:text-black shadow-md outline-none rounded-xl px-[1rem] py-[1.2rem] mx-6' value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder='Email' id="email" />
          <input className='bg-black/15 placeholder:text-black shadow-md outline-none rounded-xl px-[1rem] py-[1.2rem] mx-6' value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' id="password" />
          <button type="submit" disabled={loading} className='bg-black/45 sm:text-base text-sm mx-auto px-10 font-semibold w-[45%] text-[#2fff36] py-2 rounded-xl hover:scale-105 duration-200'>Sign Up</button>
          <div className='font-medium flex items-center justify-center -m-3 w-full mx-auto '><hr className='w-[20%] border border-black/25' /> <span className='mx-3'> OR </span> <hr className='w-[20%] border border-black/25' /></div>
          <Link to={"/login"} className='border-x rounded-full border-black mx-auto px-10 font-medium py-3 w-[45%] h-[10px] flex items-center justify-center hover:scale-105 duration-200'>Login</Link>
        </form>
      </section>
    </div>
  )
}
