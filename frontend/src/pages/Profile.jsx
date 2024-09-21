import { useEffect } from "react";
import Banner from "../components/Banner";
import Input from "../components/Input";
import Post from "../components/Post";
import Return from "../components/Return";
import UserInfo from "../components/UserInfo";
import { useUser } from "../contexts/UserContext";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const { user, getUserFromHisId } = useUser();
  useEffect(() => {
    getUserFromHisId(id);
  }, []);

  if (user) {
    console.log(user);
  }
  return (
    <>
      <section className="">
        {/* Head Of Page Profile */}
        <Return user={user} />
        {/* Banner of the Page Profile */}
        <Banner />
        {/* UserInfo */}
        <div className="relative mt-[74px] mb-8 mx-8">
          <UserInfo user={user} />
        </div>
        {/* Input if user profile is who is logged */}
        <div className="mx-8 ">
          <Input />
        </div>
        <div className="mx-8 ">
          <Post />
        </div>
      </section>
    </>
  );
}
export default Profile;
