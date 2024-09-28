import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import filled and outlined heart icons
import { useAuthUser } from "../contexts/AuthContext";
import { useLike } from "../contexts/LikeContext";
import { useEffect, useState } from "react";

function Post({ post }) {
  const { user } = useAuthUser();
  const { likes, addLike, getAllLikes, deleteLike } = useLike();
  const [filterLikes, setFilterLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  // Function to handle like toggle
  async function handleLikeToggle(e) {
    e.preventDefault();
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

  // Filter likes for the current post
  useEffect(() => {
    if (likes) {
      const res = likes.filter((like) => like?.post?._id === post?._id);
      setFilterLikes(res);
    }
  }, [likes, post?._id]);

  // Set whether the post is liked by the current user
  useEffect(() => {
    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);
    setIsLiked(hasLiked);
  }, [filterLikes, user]);

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
          {post?.image && (
            <img
              className="rounded-lg my-4 h-94 w-full object-cover"
              src={`${post?.image}`}
              alt=""
            />
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <form onSubmit={handleLikeToggle}>
                <button type="submit">
                  <span className="flex items-center space-x-1 cursor-pointer">
                    {isLiked ? (
                      <FaHeart size={24} /> // Filled heart if liked
                    ) : (
                      <FaRegHeart size={24} /> // Outlined heart if not liked
                    )}
                    <p>{filterLikes.length}</p> {/* Display likes count */}
                  </span>
                </button>
              </form>
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
