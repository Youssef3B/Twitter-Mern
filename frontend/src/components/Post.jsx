import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

function Post() {
  return (
    <>
      <div className="my-8">
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
          </div>
        </div>
        <div>
          <h3 className="my-4 font-bold text-xl">this is a Post</h3>
          <img className="rounded-lg my-4" src="/post.png" alt="" />
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <CiHeart size={24} />
              <p>0</p>
            </span>
            <span className="flex items-center space-x-1">
              <FaRegComment size={18} />
              <p>0</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Post;
