import { useRef } from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { useClickOutSide } from "../hooks/useClickOutside";
import axios from "axios";
import toast from "react-hot-toast";

export const DeleteUser = () => {
  const navigate = useNavigate();
  const ref = useRef();

  useClickOutSide(ref, () => navigate("/contacts"));
  return (
    <div className="fixed z-20 flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-[12px]">
      <div
        ref={ref}
        className="relative rounded-xl p-4 w-[80%] backdrop-blur-xl bg-gradient-to-tl from-[rgba(43,45,45,0.5)] to-[rgba(58,246,227,0.5)] max-w-xl"
      >
        <Form method="POST" className="flex flex-col bg-blue-100 p-3 rounded-md gap-6" >
          <p className="text-2xl mx-auto" >Are You Sure ?</p>
          <div className="flex justify-evenly w-[70%] mx-auto mt-3 text-xl">
            <Link to='/contacts' className="px-4 py-2 border active:bg-black/20 active:text-white border-black" autoFocus>Cancel</Link>
            <button  className="px-4 py-2 border border-red-500 active:bg-red-400 active:text-white text-red-600" type="submit">Delete</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

DeleteUser.action = async({params})=>{
  try{
    const {data}=await axios.delete(`/contact/${params.id}`)
    toast.error(data.message)
    return redirect('..')
  }catch(e){
    toast.error(e.response.data.message)
  }
}