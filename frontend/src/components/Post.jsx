import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

function Post({ post }) {
  return (
    <>
      <div className="my-4 border-2 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="">
            <img
              className=" h-16 w-16 rounded-full object-cover object-center"
              src={`/uploads/${post?.user?.avatar}`}
              alt=""
            />
          </div>
          <div className="">
            <div className="flex items-center space-x-2 ">
              <h3 className="font-semibold text-lg">{post?.user?.fullName}</h3>
              <p className="text-gray-600">13h</p>
            </div>
            <h4 className="text-gray-600 font-medium">
              {post?.user?.userName}
            </h4>
          </div>
        </div>
        <div>
          <h3 className="my-4 font-bold text-xl">{post?.title}</h3>
          {post?.image === null ? (
            ""
          ) : (
            <img
              className="rounded-lg my-4 h-64 w-full object-cover"
              src={`${post?.image}`}
              alt=""
            />
          )}

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
