import axios from "axios";
import { useRef, useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useClickOutSide } from "../hooks/useClickOutside";
import useDebounce from "../hooks/useDebounce";
import toast from "react-hot-toast";

export const EditUser = () => {
  const user = useLoaderData();
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const navigate = useNavigate();
  const debounceImg = useDebounce(name, 300)
  const ref = useRef();

  useClickOutSide(ref, () => navigate(".."));
  return (
    <div className="fixed z-20 flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-[12px]">
      <div
        ref={ref}
        className="relative rounded-xl p-4 w-[90%] backdrop-blur-xl bg-gradient-to-br from-[rgba(43,45,45,0.5)] to-[rgba(58,246,227,0.5)] max-w-xl"
      >
        <div className="flex flex-col bg-blue-100 justify-around h-[60vh] sm:h-[75vh]">
          <section>
            <div className="px-4 pt-4 pb-3">
              <h3 className="text-2xl border-b-2 border-gray-500">
                Editing User
              </h3>
            </div>
            <div className="flex flex-col items-center mt-6 justify-center h-[80px] ">
              <img
                src={debounceImg}
                alt="Avatar"
                className="mb-3 sm:h-[200px] h-[100px] my-2 rounded-full"
              />
            </div>
          </section>
          <Form method="POST" className="flex py-3 flex-col">
            <div className="flex p-3">
              <label className="text-xl" htmlFor="name">Name: </label>
              <input
                autoFocus
                type="text"
                className="bg-inherit pb-1 tracking-[1px] text-lg border-b px-4 outline-none w-full ml-2 border-black"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex px-3 py-6">
              <label className="text-xl" htmlFor="email">Email: </label>
              <input
                type="email"
                className="bg-inherit pb-1 tracking-[1px] text-lg border-b px-4 outline-none w-full ml-2 border-black"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex p-3">
              <label className="text-xl" htmlFor="phone">Phone: </label>
              <input
                type="number"
                className="bg-inherit pb-1 tracking-[1px] text-lg border-b px-4 outline-none w-full ml-2 border-black"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="text-right px-6">
              <button
                onClick={() => navigate("/contacts")}
                className="rounded-lg bg-black mx-2 font-semibold text-white px-6 py-2"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-green-600 font-semibold text-white px-6 py-2">
                Update
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

EditUser.loader = async ({ params }) => {
  const response = await axios.get(`/contact/${params.id}`);
  return response.data.user;
};

EditUser.action = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };
    const res = await axios.put(`/contact/${params.id}`, data, { withCredentials: true });
    toast.success(res.data.message)
    return redirect("..");
  } catch (e) {
    toast.error(e.response.data.message)
  }
};
