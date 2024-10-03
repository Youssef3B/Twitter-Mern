import Post from "../components/Post";
import Search from "../components/Search";
import { useSave } from "../contexts/SaveContext";

function Saves() {
  const { allSaves, getAllSaves } = useSave();
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
export default Saves;
