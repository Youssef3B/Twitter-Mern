import Input from "../components/Input";
import Posts from "../components/Posts";

function Home() {
  return (
    <>
      <div className="  px-8 ">
        <div className="">
          <h1 className="font-bold text-2xl my-3">Home</h1>
          <Input />
          <Posts />
        </div>
      </div>
    </>
  );
}
export default Home;
