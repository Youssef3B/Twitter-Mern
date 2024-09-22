import { useEffect, useState } from "react";
import Search from "../components/Search";
import UserCard from "../components/UserCard";
import { useUser } from "../contexts/UserContext";
import LoadingUser from "../components/LoadingUser";

function People() {
  const [loading, setLoading] = useState(true);
  const { allUsers, getAllUsers } = useUser();
  useEffect(() => {
    setLoading(true);
    getAllUsers().finally(() => setLoading(false));
  }, []);
  return (
    <div className="my-8 mx-4">
      <Search />
      {loading ? (
        <LoadingUser />
      ) : (
        <div className="grid grid-cols-3 gap-4 my-8">
          {allUsers &&
            allUsers.map((user, index) => <UserCard user={user} key={index} />)}
        </div>
      )}
    </div>
  );
}
export default People;
