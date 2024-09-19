import Post from "../components/Post";
import Search from "../components/Search";

function Explore() {
  return (
    <div className="my-4 mx-8">
      <Search />
      <div className="grid grid-cols-3 gap-1">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
export default Explore;
