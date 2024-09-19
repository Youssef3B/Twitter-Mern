import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

function Post() {
  return (
    <>
      <div className="my-4 border-2 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="">
            <img
              className=" h-16 w-16 rounded-full object-cover object-center"
              src="/user.jpg"
              alt=""
            />
          </div>
          <div className="">
            <div className="flex items-center space-x-2 ">
              <h3 className="font-semibold text-lg">Arther Leywin</h3>
              <p className="text-gray-600">13h</p>
            </div>
            <h4 className="text-gray-600 font-medium">@Arther07</h4>
          </div>
        </div>
        <div>
          <h3 className="my-4 font-bold text-xl">this is a Post</h3>
          <img className="rounded-lg my-4" src="/post.png" alt="" />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 cursor-pointer">
                <CiHeart size={24} />
                <p>0</p>
              </span>
              <span className="flex items-center space-x-1 cursor-pointer">
                <FaRegComment size={18} />
                <p>0</p>
              </span>
            </div>
            <span className="flex items-center space-x-1 cursor-pointer">
              <CiBookmark size={24} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Post;
