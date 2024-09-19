import Banner from "../components/Banner";
import Input from "../components/Input";
import Post from "../components/Post";
import Return from "../components/Return";
import UserInfo from "../components/UserInfo";

function Profile() {
  return (
    <>
      <section className="">
        {/* Head Of Page Profile */}
        <Return />
        {/* Banner of the Page Profile */}
        <Banner />
        {/* UserInfo */}
        <div className="relative mt-[74px] mb-8 mx-8">
          <UserInfo />
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
