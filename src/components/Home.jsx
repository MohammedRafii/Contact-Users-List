import { Link } from "react-router-dom";
import MyLogo from '../assets/MyLogo.svg'

export const Home = () => {
  return (
    <div className="flex flex-col  backdrop-blur bg-gradient-to-t from-[rgba(20,42,94,0.8)] to-[rgba(28,35,227,0.7)] text-white justify-center items-center h-screen w-full">
        <img src={MyLogo} />
        <h1 className="text-2xl my-8 sm:text-4xl md:text-5xl underline underline-offset-4 italic lg:text-6xl xl:text-7xl text-[#91ffc2e8]">Mohammed Rafi's Project</h1>
        <p className="lg:text-5xl sm:text-xl md:text-4xl my-8">
          <span className="text-green-300 tracking-wider p-2"><span className="underline underline-offset-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">C</span>reate</span>
          <span className="text-blue-300 tracking-wider p-2"><span className="underline underline-offset-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">R</span>ead</span>
          <span className="text-orange-300 tracking-wider p-2"><span className="underline underline-offset-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">U</span>pdate</span>
          <span className="text-yellow-300 tracking-wider p-2"><span className="underline underline-offset-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">D</span>elete</span>
        </p>
        <Link to="users">
<<<<<<< HEAD
          <button className="sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-tr from-[#37ead8b6] to-[#6284e37d] font-semibold active:from-[#37ead8e3] active:to-[#6284e3c2] text-white mt-6 px-6 py-4  rounded-md">Go Inside</button>
=======
          <button className="sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-tr from-[#37ead8b6] to-[#6284e37d] font-semibold active:from-[#37ead8e3] active:to-[#6284e3c2] text-white mt-6 px-6 py-4  rounded-md">Click Here</button>
>>>>>>> bdb41e6 (updated)
        </Link>
    </div>
  );
};