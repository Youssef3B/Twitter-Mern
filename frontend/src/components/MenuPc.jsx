import { FaRegBookmark } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoHomeOutline, IoPeopleOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";

function MenuPc() {
  return (
    <div className=" w-[320px] fixed h-full py-4 px-10 ">
      <div>
        <img src="/Twitter-Logo.png" className="w-14 pb-8" alt="" />
        <ul className="flex flex-col space-y-10">
          <li className="">
            <p className="flex items-center space-x-3 text-2xl font-bold">
              <IoHomeOutline size={24} />
              <span>Home</span>
            </p>
          </li>
          <li className="">
            <p className="flex items-center space-x-3 text-2xl font-bold">
              <MdOutlineExplore size={24} />
              <span>Explore</span>
            </p>
          </li>
          <li className="">
            <p className="flex items-center space-x-3 text-2xl font-bold">
              <IoIosNotificationsOutline size={24} />
              <span>Notification</span>
            </p>
          </li>
          <li className="">
            <p className="flex items-center space-x-3 text-2xl font-bold">
              <IoPeopleOutline />
              <span>People</span>
            </p>
          </li>
          <li className="">
            <p className="flex items-center space-x-3 text-2xl font-bold">
              <FaRegBookmark />
              <span>Saves</span>
            </p>
          </li>
          <li className="">
            <p className="flex items-center space-x-3 text-2xl font-bold">
              <LuUser2 />
              <span>Profile</span>
            </p>
          </li>
          <button className="bg-sky-500 py-3 rounded-full text-white font-bold transition-all hover:bg-sky-600">
            Log Out
          </button>
        </ul>
      </div>
    </div>
  );
}
export default MenuPc;
