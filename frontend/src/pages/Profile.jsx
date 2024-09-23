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

function Profile() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user, getUserFromHisId, UpdateUserFromHisId } = useUser();
  const { user: authUser } = useAuthUser();

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
        <Post />
      </div>
    </section>
  );
}

export default Profile;
