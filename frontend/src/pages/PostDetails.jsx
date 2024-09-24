import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { usePost } from "../contexts/PostContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import Comments from "../components/Comments";

function PostDetails() {
  const { id } = useParams();
  const { post, getPostFromHisId } = usePost();
  const [Loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      await getPostFromHisId(id);
      setLoading(false);
    }

    if (id) {
      fetchPost();
    }
  }, [id]);
  return (
    <>
      <section>
        <div>
          <div className="py-4 px-8 border my-8 mx-5">
            <div className="flex items-center space-x-2">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={`/uploads/${post?.user?.avatar}`}
                alt=""
              />
              <div>
                <h3 className="font-semibold">
                  {post?.user?.fullName}
                  <span className="text-sm font-light text-gray-600">13h</span>
                </h3>
                <p className="text-sm text-gray-600"> {post?.user?.userName}</p>
              </div>
            </div>
            <div className="my-4">
              <h3 className="font-semibold text-xl">{post?.title}</h3>
              <img
                className="my-4 w-full h-[600px] object-cover rounded-lg"
                src={post?.image}
                alt=""
              />
            </div>
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
            <Comments />
          </div>
        </div>
      </section>
    </>
  );
}
export default PostDetails;
