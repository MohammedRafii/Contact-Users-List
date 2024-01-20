import axios from "axios";
import {FaStreetView} from "react-icons/fa"
import {LiaEdit} from "react-icons/lia"
import {IoArrowBack, IoTrashOutline} from "react-icons/io5"
import { IoMdPersonAdd } from "react-icons/io";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import MyLogo from '../assets/MyLogo.svg'
import { useState } from "react";

export const Users = () => {
  const users = useLoaderData();
  const [page, setPage] = useState(1)
  const selectPageHandler = (selectedPage)=>{
    if(selectedPage >= 1 && selectedPage <= Math.ceil(users.length / 7) && selectedPage !== page){
      setPage(selectedPage)
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center w-full bg-gradient-to-r from-sky-500 to-indigo-500">
      <a
        href="https://mohammedrafi.vercel.app"
        target="_blank"
        title="My_Portfolio"
        className="fixed bottom-[14rem] right-2 z-10 p-3 lg:right-16 sm:right-2 duration-300 bg-gradient-to-br from-gray-900 to-gray-900 shadow-lg rounded-full text-white  font-bold text-4xl"
      >
        <img src={MyLogo} className="w-10 h-10" alt="github logo" />
      </a>
      <Link
        to="create"
        className="fixed bottom-[9rem] right-2 z-10 p-3 lg:right-16 sm:right-2 backdrop-blur-[10px] bg-gradient-to-r from-[rgba(13,231,49,0.71)] to-[rgba(89,241,84,0.75)] duration-300  shadow-lg rounded-full text-white  font-bold text-4xl"
      >
        <IoMdPersonAdd />
      </Link>
      <Link
        to="/"
        className="fixed bottom-16 right-2 z-10 p-3 lg:right-16 sm:right-2 backdrop-blur-[10px] bg-gradient-to-r from-[rgba(179,151,151,0.3)] to-[rgba(134,115,134,0.5)] duration-300  shadow-lg rounded-full text-white  font-bold text-4xl"
      >
        <IoArrowBack />
      </Link>
      <main className="grid justify-center  max-w-[80%]  
      grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mx-auto">
        {users.slice(page * 7 - 7,page * 7).map(({_id,name,email,phone})=>(
        <figure
          key={_id}
          className="shadow-lg backdrop-blur-xl bg-green-100  text-black p-3 rounded-md w-[300px] mt-3 mb-2 sm:h-[400px] h-[300px] flex flex-col justify-around  justify-self-center"
        >
          <figcaption className="flex border-b border-black justify-between px-3 items-center">
            <h2 className="text-2xl italic uppercase w-[80%]">{name.slice(0,10)}{(name.length>10) ?"...":""}</h2>
            <Link to={`${_id}/view`} className="cursor-pointer"><FaStreetView size={23}/></Link>
          </figcaption>
          <div className="flex justify-center items-center ">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=65c9ff,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,transparent&backgroundType=solid,gradientLinear&accessories=kurt,prescription01,prescription02,round,sunglasses,wayfarers&accessoriesColor=5199e4,65c9ff,929598,a7ffc4,b1e2ff,e6e6e6,ff488e,ff5c5c,ffafb9,ffdeb5,ffffb1,ffffff&clothingGraphic=bat,bear,cumbia,deer,diamond,hola,resist,skullOutline,skull,pizza&eyebrows=flatNatural,frownNatural,raisedExcited,raisedExcitedNatural&eyes=happy,default,surprised,winkWacky&hairColor=2c1b18,4a312c,724133,a55728,b58143,d6b370,f59797&mouth=serious,smile,twinkle,default&skinColor=ae5d29,d08b5b,edb98a,f8d25c,fd9841&top=dreads01,shaggy,shortCurly,shortFlat,shortRound,shortWaved,theCaesar,theCaesarAndSidePart,winterHat03,winterHat04,winterHat1`} alt="Avatar" className="sm:w-[200px] w-[150px] border border-black rounded-full " />
          </div>
          <figcaption className="border-t border-black px-3 flex justify-between ">
            <div>
              <p className="font-medium">{email.slice(0,15)}{(email.length>15) ?"...":""}</p>
              <p className="text-gray-700">{phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to={`${_id}/edit`} className="cursor-pointer"><LiaEdit size={23}/></Link>
              <Link to={`${_id}/delete`} className="cursor-pointer"><IoTrashOutline size={23}/></Link>
            </div>
          </figcaption>
        </figure>
        ))}
      </main>
        <div className="mx-auto flex items-center py-2 text-2xl">
          <div className="flex items-center mx-auto">
          <span onClick={()=>selectPageHandler(page-1)} className={`${page > 1 ? "":"hidden"} mr-2  font-medium hover:underline cursor-pointer active:underline`}>Prev</span>
        <div className="flex mx-auto m-4  text-xl">
          {[...Array(Math.ceil(users.length/7))].map((_,i)=>{
            return <span key={i} onClick={()=>selectPageHandler(i+1)} className={`rounded-full p-2 px-4 cursor-pointer mx-2 ${page===i+1 ? "scale-125 text-white bg-blue-800":" bg-gray-400 "}`}>{i+1}</span>
          })}
        </div>
          <span onClick={()=>selectPageHandler(page+1)} className={`${page < Math.ceil(users.length/7) ? "":"hidden"} cursor-pointer ml-2 font-medium hover:underline active:underline`}>Next</span>
          </div>
        </div>
      <Outlet />
    </div>
  );
};

Users.loader = async () => {
    const response = await axios.get("/api/users");
    return response.data;
};
