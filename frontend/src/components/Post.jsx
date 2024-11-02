import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaBookmark } from "react-icons/fa";
import { useAuthUser } from "../contexts/AuthContext";
import { useLike } from "../contexts/LikeContext";
import { useSave } from "../contexts/SaveContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Post({ post }) {
  const { user } = useAuthUser();
  const { likes, addLike, getAllLikes, deleteLike } = useLike();
  const { allSaves, addSave, deleteSave, getAllSaves } = useSave();
  const [filterLikes, setFilterLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [filterSaves, setFilterSaves] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const calculateTimePassed = (createdAt) => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      const day = postDate.getDate().toString().padStart(2, "0");
      const month = (postDate.getMonth() + 1).toString().padStart(2, "0");
      const hours = postDate.getHours().toString().padStart(2, "0");
      const minutes = postDate.getMinutes().toString().padStart(2, "0");
      return `${day}/${month} ${hours}:${minutes}`;
    }
  };

  async function handleLikeToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);

    if (hasLiked) {
      await deleteLike(user?._id, post?._id);
      setIsLiked(false);
    } else {
      const data = { user: user?._id, post: post?._id };
      setIsLiked(true);
      await addLike(data);
    }

    await getAllLikes();
  }

  async function handleSaveToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    const hasSaved = filterSaves.some((save) => save?.user?._id === user?._id);

    if (hasSaved) {
      await deleteSave(user?._id, post?._id);
      setIsSaved(false);
    } else {
      const data = { user: user?._id, post: post?._id };
      setIsSaved(true);
      await addSave(data);
    }

    await getAllSaves();
  }

  useEffect(() => {
    if (likes) {
      const res = likes.filter((like) => like?.post?._id === post?._id);
      setFilterLikes(res);
    }
  }, [likes, post?._id]);

  useEffect(() => {
    if (allSaves) {
      const res = allSaves.filter((save) => save?.post._id === post?._id);
      setFilterSaves(res);
    }
  }, [allSaves, post?._id]);

  useEffect(() => {
    const hasLiked = filterLikes.some((like) => like?.user?._id === user?._id);
    setIsLiked(hasLiked);
  }, [filterLikes, user]);

  useEffect(() => {
    const hasSaved = filterSaves.some((save) => save?.user?._id === user?._id);
    setIsSaved(hasSaved);
  }, [filterSaves, user]);

  return (
    <div className="my-4 border-2 p-4 rounded-lg">
      <div className="flex items-center space-x-3">
        <div>
          <img
            className="h-16 w-16 rounded-full object-cover object-center"
            src={`/uploads/${post?.user?.avatar}`}
            alt=""
          />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-lg">{post?.user?.fullName}</h3>
            <p className="text-gray-600">{calculateTimePassed(post?.createdAt)}</p>
          </div>
          <h4 className="text-gray-600 font-medium">{post?.user?.userName}</h4>
        </div>
      </div>

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
              <p>{filterLikes.length}</p>
            </span>
          </button>
          <span className="flex items-center space-x-1 cursor-pointer">
            <FaRegComment size={18} />
            <p>0</p>
          </span>
        </div>
        <button onClick={handleSaveToggle}>
          <span className="flex items-center space-x-1 cursor-pointer">
            {isSaved ? <FaBookmark size={24} /> : <CiBookmark size={24} />}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Post;
