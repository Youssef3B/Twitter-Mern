import Search from "../components/Search";
import UserCard from "../components/UserCard";

function People() {
  return (
    <div className="my-8 mx-4">
      <Search />
      <div className="grid grid-cols-3 gap-4 my-8">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}
export default People;
