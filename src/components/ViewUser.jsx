import { useRef } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useClickOutSide } from "../hooks/useClickOutside";
import axios from "axios";
import { LiaEdit } from "react-icons/lia";
import useDebounce from "../hooks/useDebounce";

export const ViewUser = () => {
  const user = useLoaderData();
  const { _id, name, email, phone } = user;
  const navigate = useNavigate();
  const ref = useRef();
  const debounceImg = useDebounce(name, 300)

  useClickOutSide(ref, () => navigate('/contacts'));
  return (
    <div className="fixed z-20 flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-[10px]">
      <div
        ref={ref}
        className="relative rounded-xl p-4 w-[90%] backdrop-blur-xl bg-gradient-to-tr from-[rgba(43,45,45,0.5)] to-[rgba(58,246,227,0.5)] max-w-xl"
      >
        <figure className="bg-blue-100 text-black p-3 rounded-md  flex flex-col justify-around">
          <figcaption className="flex  pb-2 justify-between px-3 items-center">
            <div className="flex items-center">
              <label className="sm:text-2xl underline underline-offset-[8px]">
                Name{" "}
              </label> <span className="text-3xl ml-1">:</span>
              <h2 className="sm:text-2xl text-sm italic mt-2 ml-3 uppercase w-[80%]">
                {name}
              </h2>
            </div>
            <Link to={`/contacts/${_id}/edit`}>
              <LiaEdit size={30} />
            </Link>
          </figcaption>
          <div className="flex justify-center  items-center ">
            <img
              src={debounceImg}
              alt="Avatar"
              className="sm:w-[250px] w-[120px] rounded-full shadow-xl border border-black bg-gradient-to-tl to-orange-200 from-green-200 "
            />
          </div>
          <figcaption className="pt-3 pb-4 w-full px-3 flex flex-col justify-between ">
            <div className="sm:text-xl text-sm w-[80%]">
              <div className="flex gap-2">
                <label className="underline underline-offset-[2px] sm:underline-offset-[8px]">
                  Email{" "}
                </label> <span className="ml-2">:</span>
                <p className="font-medium text-xs sm:text-lg">{email}</p>
              </div>
              <div className="flex gap-2">
                <label className="underline underline-offset-[2px] sm:underline-offset-[8px]">
                  Phone{" "}
                </label> <span>:</span>
                <p className="text-gray-700 text-xs sm:text-lg">{phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-evenly pt-6 sm:w-[50%] mx-auto">
              <button className="border px-4 py-2 border-black active:bg-black/20" onClick={() => navigate(-1)}>
                Close
              </button>
              <Link to={`/contacts/${_id}/delete`} className="bg-red-500 sm:w-[50%] active:bg-red-600 px-4 py-2 ml-2 border border-red-500 text-white">
                Delete
              </Link>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

ViewUser.loader = async ({ params }) => {
  const response = await axios.get("/contact/" + params.id);
  return response.data.user;
};
