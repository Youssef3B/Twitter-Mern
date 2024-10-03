import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import filled and outlined heart icons
import { useAuthUser } from "../contexts/AuthContext";
import { useLike } from "../contexts/LikeContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Post({ post }) {
  const { user } = useAuthUser();
  const { likes, addLike, getAllLikes, deleteLike } = useLike();
  const [filterLikes, setFilterLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  async function handleLikeToggle(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent both default form behavior and event bubbling

    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);

    if (hasLiked) {
      await deleteLike(user?._id, post?._id);
      setIsLiked(false);
    } else {
      const data = { user: user?._id, post: post?._id };
      setIsLiked(true);
      await addLike(data);
    }

    await getAllLikes(); // Re-fetch likes
  }

  useEffect(() => {
    if (likes) {
      const res = likes.filter((like) => like?.post?._id === post?._id);
      setFilterLikes(res);
    }
  }, [likes, post?._id]);

  useEffect(() => {
    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);
    setIsLiked(hasLiked);
  }, [filterLikes, user]);

  return (
    <div className="my-4 border-2 p-4 rounded-lg">
      <div className="flex items-center space-x-3">
        <div>
          <img
            className=" h-16 w-16 rounded-full object-cover object-center"
            src={`/uploads/${post?.user?.avatar}`}
            alt=""
          />
        </div>
        <div>
          <div className="flex items-center space-x-2 ">
            <h3 className="font-semibold text-lg">{post?.user?.fullName}</h3>
            <p className="text-gray-600">13h</p>
          </div>
          <h4 className="text-gray-600 font-medium">{post?.user?.userName}</h4>
        </div>
      </div>

      {/* Link only wraps the title or the image */}
      <Link to={`/poste/${post?._id}`}>
        <h3 className="my-4 font-bold text-xl">{post?.title}</h3>
        {post?.image && (
          <img
            className="rounded-lg my-4 h-94 w-full object-cover"
            src={`${post?.image}`}
            alt=""
          />
        )}
      </Link>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={handleLikeToggle}>
            <span className="flex items-center space-x-1 cursor-pointer">
              {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              <p>{filterLikes.length}</p> {/* Display likes count */}
            </span>
          </button>
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
  );
}

export default Post;
