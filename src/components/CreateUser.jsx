import { useRef, useState } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import {  useClickOutSide } from "../hooks/useClickOutside";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

export const CreateUser = () => {
  const ref = useRef()
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useClickOutSide(ref,()=>navigate('/users'))

  const debounce = useDebounce(name,300)

  return (
    <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-[10px] bg-gradient-to-r from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.1)]">
      <div ref={ref} className="relative bg-green-100 rounded-xl p-4 w-full max-w-xl">
        <div className="px-4 pt-4">
          <h3 className="text-2xl border-b-2 border-gray-500">Creating User</h3>
        </div>
        <div className="flex flex-col items-center mt-6 justify-center  h-[100px]">
          <img src={debounce} alt="Avatar" className="w-[150px] my-2 rounded-full" />
        </div>
        <Form method="post" encType="multipart/form-data" className="h-[50vh] flex px-4 flex-col justify-evenly">
          <div className="flex p-6">
            <label htmlFor="name">Name: </label>
            <input
              autoFocus
              type="text"
              className="bg-inherit pb-1 tracking-[1px] border-b px-4 outline-none w-full ml-2 border-black"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex p-6">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              className="bg-inherit pb-1 tracking-[1px] border-b px-4 outline-none w-full ml-2 border-black"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex p-6">
            <label htmlFor="phone">Phone: </label>
            <input
              type="number"
              className="bg-inherit pb-1 tracking-[1px] border-b px-4 outline-none w-full ml-2 border-black"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="text-right px-6">
            <button
              onClick={() => navigate('/users')}
              className="rounded-lg bg-black mx-2 font-semibold text-white px-6 py-2"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-green-600 font-semibold text-white px-6 py-2">
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

CreateUser.action = async({request})=>{
  const formData = await request.formData()
  const allData = {
    name:formData.get('name'),
    email:formData.get('email'),
    phone:formData.get('phone'),
  }
  await axios.post('/api/users',allData)
  return redirect('/users')
}