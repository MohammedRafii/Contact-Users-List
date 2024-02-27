import { useContext } from 'react'
import { Context } from '../main'
import Loader from './Loader'
import { Header } from './Header'

export const Profile = () => {

   const { loading, user, totalContacts } = useContext(Context)
   return( <>
      <header className="h-[10vh]">
         <Header />
      </header>

      {loading ? 
      <Loader />
       :
      <div className='flex flex-col w-[45%] gap-6 font-medium text-2xl m-6 rounded-lg bg-slate-300 p-6'>
         <h1 className="text-3xl">Name   : {user?.name}</h1>
         <p className="font-mono">Email  : {user?.email}</p>
         <p className=''>Your have saved {totalContacts} {totalContacts>1?"Contacts":"Contact"}</p>
      </div>}
   </>
)}