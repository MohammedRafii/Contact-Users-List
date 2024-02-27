import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Layouts = () => {

  return (
    <>
      <Outlet />
      <div className="absolute bottom-3">
      <Toaster/>
      </div>
    </>
  );
};

export default Layouts;