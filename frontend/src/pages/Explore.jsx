import { useEffect, useState } from "react";
import Post from "../components/Post";
import Search from "../components/Search";
import { usePost } from "../contexts/PostContext";
import { Link } from "react-router-dom";

function Explore() {
  const { getAllPosts, AllPosts } = usePost();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="my-4 mx-8">
      <Search search={search} setSearch={setSearch} />

      <div className="grid grid-cols-2 gap-x-4 my-4">
        {AllPosts &&
          AllPosts.filter((post) => {
            return search === ""
              ? post
              : post.title.toLowerCase().includes(search.toLowerCase());
          }).map((post) => (
            <Link to={`/poste/${post?._id}`} key={post?._id}>
              <Post post={post} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Explore;
