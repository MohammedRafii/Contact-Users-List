import { useRef } from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { useClickOutSide } from "../hooks/useClickOutside";
import axios from "axios";

export const DeleteUser = () => {
  const navigate = useNavigate();
  const ref = useRef();

<<<<<<< HEAD
  useClickOutSide(ref, () => navigate("/Contact-Users-List/users"));
=======
  useClickOutSide(ref, () => navigate("/users"));
>>>>>>> bdb41e6 (updated)
  return (
    <div className="fixed z-20 flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-[12px]">
      <div
        ref={ref}
        className="relative rounded-xl p-4 w-full backdrop-blur-xl bg-gradient-to-tl from-[rgba(43,45,45,0.5)] to-[rgba(58,246,227,0.5)] max-w-xl"
      >
        <Form method="POST" className="flex flex-col bg-blue-100 p-3 rounded-md gap-6" >
          <p className="text-2xl mx-auto" >Are You Sure ?</p>
          <div className="flex justify-evenly w-[70%] mx-auto mt-3 text-xl">
<<<<<<< HEAD
            <Link to='/Contact-Users-List/users' className="px-4 py-2 border active:bg-black/20 active:text-white border-black" autoFocus>Cancel</Link>
=======
            <Link to='/users' className="px-4 py-2 border active:bg-black/20 active:text-white border-black" autoFocus>Cancel</Link>
>>>>>>> bdb41e6 (updated)
            <button  className="px-4 py-2 border border-red-500 active:bg-red-400 active:text-white text-red-600" type="submit">Delete</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

DeleteUser.action = async({params})=>{
  await axios.delete(`/api/users/${params.id}`)
  return redirect('..')
}