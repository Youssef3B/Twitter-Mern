import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { usePost } from "../contexts/PostContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "../components/Comments";
import { useAuthUser } from "../contexts/AuthContext";
import { useLike } from "../contexts/LikeContext";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function PostDetails() {
  const { id } = useParams();
  const { post, getPostFromHisId } = usePost();
  const { user } = useAuthUser();
  const [Loading, setLoading] = useState(false);
  const [filterLikes, setFilterLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const { likes, addLike, getAllLikes, deleteLike } = useLike();

  async function handleLikeToggle(e) {
    e.preventDefault();
    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id); // Check if user already liked the post

    if (hasLiked) {
      // If user has liked, delete the like
      await deleteLike(user?._id, id); // Pass user ID and post ID to delete the like
      setIsLiked(false);
    } else {
      // If user has not liked, add the like
      const data = { user: user?._id, post: id };
      setIsLiked(true);
      await addLike(data); // Add the like
    }

    await getAllLikes(); // Re-fetch the likes after adding/deleting
  }

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

  async function FilterPosts() {
    if (likes) {
      const res = likes.filter((like) => like?.post?._id === id);
      setFilterLikes(res);
    }
  }

  useEffect(() => {
    if (likes) {
      FilterPosts();
    }
  }, [likes, id]);

  useEffect(() => {
    // Check if the current user has already liked the post
    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);
    setIsLiked(hasLiked);
  }, [filterLikes, user]);

  if (filterLikes) {
    console.log(filterLikes);
  }

  return (
    <>
      {Loading ? (
        <LoadingPost />
      ) : (
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
                    <span className="text-sm font-light text-gray-600">
                      13h
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    {" "}
                    {post?.user?.userName}
                  </p>
                </div>
              </div>
              <div className="my-4">
                <h3 className="font-semibold text-xl">{post?.title}</h3>
                {post?.image && (
                  <img
                    className="my-4 w-full h-[600px] object-cover rounded-lg"
                    src={post?.image}
                    alt=""
                  />
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <form onSubmit={handleLikeToggle}>
                    <button type="submit">
                      <span className="flex items-center space-x-1 cursor-pointer">
                        {isLiked ? (
                          <FaHeart size={20} />
                        ) : (
                          <FaRegHeart size={20} />
                        )}
                        <p>{filterLikes.length}</p>{" "}
                        {/* Display the filtered likes count */}
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
              <Comments user={user} id={id} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
import LoadingUser from "../components/LoadingUser";
import LoadingPost from "../components/LoadingPost";

export default PostDetails;
