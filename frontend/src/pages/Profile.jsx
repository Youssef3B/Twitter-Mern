import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Input from "../components/Input";
import Post from "../components/Post";
import Return from "../components/Return";
import UserInfo from "../components/UserInfo";
import { useUser } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import LoadingBanner from "../components/LoadingBanner";
import { useAuthUser } from "../contexts/AuthContext";
import { usePost } from "../contexts/PostContext";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [filterPosts, setFilterPosts] = useState([]);
  const { id } = useParams();
  const { user, getUserFromHisId, UpdateUserFromHisId } = useUser();
  const { getAllPosts, AllPosts } = usePost();
  const { user: authUser } = useAuthUser();

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (AllPosts && id) {
      const filteredPosts = AllPosts.filter((post) => post?.user?._id === id);
      setFilterPosts(filteredPosts);
    }
  }, [AllPosts, id]);
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      await getUserFromHisId(id);
      setLoading(false);
    }

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (filterPosts) {
    console.log(filterPosts);
  }

  return (
    <section>
      {/* Head Of Page Profile */}
      <Return user={user} />

      {/* Banner of the Page Profile */}
      {loading ? (
        <LoadingBanner />
      ) : (
        <Banner
          getUserFromHisId={getUserFromHisId}
          user={user}
          UpdateUserFromHisId={UpdateUserFromHisId}
          id={id}
          authUser={authUser}
        />
      )}

      {/* UserInfo */}
      <div className="relative mt-[74px] mb-8 mx-8">
        {loading ? <div>Loading...</div> : <UserInfo user={user} />}
      </div>

      {/* Input if user profile is who is logged */}
      <div className="mx-8">
        {authUser && authUser.id === id ? <Input /> : null}
      </div>

      {/* Posts */}
      <div className="mx-8">
        {filterPosts &&
          filterPosts.map((post) => <Post key={post?._id} post={post} />)}
      </div>
    </section>
  );
}

export default Profile;
