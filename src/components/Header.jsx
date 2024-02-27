import axios from 'axios'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { NavLink, Navigate, redirect } from 'react-router-dom'
import { Context } from '../main'

export const Header = () => {

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)
  const logoutHandler = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get("/user/logout", { withCredentials: true })
      toast.success(data.message)
      setIsAuthenticated(false)
      setLoading(false)
      return redirect("/login")
    }
    catch (e) {
      setIsAuthenticated(true)
      setLoading(false)
      toast.error(e.response.data.message)
    }

  }
  if (!isAuthenticated) return <Navigate to={"/login"} />
  return (
    <nav className='fixed z-20 top-0 w-full bg-blue-700 flex flex-col justify-center lg:flex lg:justify-between lg:items-center items-center px-3 py-2 text-white'>
      <div className='lg:text-4xl text-2xl text-center w-[35%] font-bold italic flex-1'>
        <h1>Contact App</h1>
      </div>
      <ul className='w-[45%] px-4 list-none gap-6 flex justify-evenly items-center'>
        <li className='lg:text-3xl text-xl text-white/50 font-medium'>
          <NavLink className={({ isActive }) => { return isActive ? "text-white" : "" }} to="/contacts">Home</NavLink>
        </li>
        <li className='lg:text-3xl text-xl text-white/50 font-medium'>
          <NavLink className={({ isActive }) => { return isActive ? "text-white" : "" }} to="/profile">Profile</NavLink>
        </li>
        <li className='lg:text-3xl text-xl text-white/50 font-medium'>
          <button disabled={loading} onClick={logoutHandler}>Logout </button>
        </li>
      </ul>
    </nav>
  )
}
