import { Outlet } from "react-router-dom";
import MenuPc from "../components/MenuPc";
import WhoToFollow from "../components/WhoToFollow";

function AppLayout() {
  return (
    <section className="grid grid-cols-4 gap-4 px-36  ">
      <MenuPc />
      <div className=" border  ml-96   col-span-3 ">
        {/* <div className="divide-y divide-gray-400 divide-solid">
          <h1 className="font-bold text-2xl my-3">Home</h1>
          <Input />
          <Posts />
        </div> */}
        <Outlet />
      </div>
      {/* <WhoToFollow /> */}
    </section>
  );
}
export default AppLayout;
