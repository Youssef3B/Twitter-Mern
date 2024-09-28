import { useEffect, useState } from "react";
import Post from "../components/Post";
import Search from "../components/Search";
import { usePost } from "../contexts/PostContext";
import { Link } from "react-router-dom";
import LoadingPost from "../components/LoadingPost";

function Explore() {
  const { getAllPosts, AllPosts } = usePost();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true); // Set loading to true when starting the fetch
      await getAllPosts();
      setLoading(false); // Set loading to false after posts are fetched
    }

    fetchPosts();
  }, []);

  return (
    <div className="my-4 mx-8">
      <Search search={search} setSearch={setSearch} />

      {/* Display loading message if still fetching */}
      {loading ? (
        <LoadingPost /> // Customize this message or replace with a spinner
      ) : (
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
      )}
    </div>
  );
}

export default Explore;
