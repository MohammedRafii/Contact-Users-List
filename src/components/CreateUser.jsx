import { useRef, useState } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { useClickOutSide } from "../hooks/useClickOutside";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import toast from "react-hot-toast";

export const CreateUser = () => {
  const ref = useRef()
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useClickOutSide(ref, () => navigate('/contacts'))

  const debounceImg = useDebounce(name, 300)

  return (
    <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-[10px] bg-gradient-to-r from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.1)]">
      <div ref={ref} className="relative bg-gradient-to-br from-[rgba(43,45,45,0.5)] to-[rgba(58,246,227,0.5)] rounded-xl p-4 w-[90%] max-w-xl">
        <div className="flex flex-col bg-blue-100 justify-around h-[60vh] sm:h-[75vh]">
          <div className="pt-2 px-2 sm:px-4 sm:pt-4">
            <h3 className="text-2xl border-b-2 border-gray-500">Creating User</h3>
          </div>
          <div className="flex flex-col items-center mt-6 justify-center h-[100px] sm:h-[150px] ">
            <img
              src={debounceImg}
              alt="Avatar"
              className="mb-3 sm:h-[170px] h-[110px] my-2 rounded-full"
            />
          </div>
          <Form method="post" encType="multipart/form-data" className="gap-2 flex px-4 flex-col justify-evenly">
            <div className="flex p-3">
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
            <div className="flex p-3">
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
            <div className="flex p-3">
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
            <div className="text-right pb-6 px-6">
              <button
                onClick={() => navigate('/contacts')}
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
    </div>
  );
};

CreateUser.action = async ({ request }) => {
  const formData = await request.formData()
  const allData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  }
  const response = await axios.post('/contact/add', allData, { headers: { "Content-Type": "application/json" }, withCredentials: true })
  toast.success(response.data.message)
  return redirect('/contacts')
}
