import { IoReturnUpBackOutline } from "react-icons/io5";

function Return({ user }) {
  return (
    <div className="flex items-center space-x-8 px-6">
      <div>
        <IoReturnUpBackOutline size={32} />
      </div>
      <div>
        <h3 className="font-bold text-xl">{user.userName}</h3>
        <span className="text-gray-600 font-semibold">1 post</span>
      </div>
    </div>
  );
}
export default Return;
