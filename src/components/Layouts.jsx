import { Outlet } from "react-router-dom";

const Layouts = () => {

  window.addEventListener('contextmenu',(e)=>e.preventDefault())
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layouts;
