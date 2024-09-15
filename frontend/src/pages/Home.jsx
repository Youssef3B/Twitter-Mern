import Input from "../components/Input";
import MenuPc from "../components/MenuPc";
import Posts from "../components/Posts";
import WhoToFollow from "../components/WhoToFollow";

function Home() {
  return (
    <>
      <section className="grid grid-cols-4 gap-4 px-36  ">
        <MenuPc />
        <div className="bg-green-white border  ml-96 px-8  col-span-3">
          <div className="divide-y divide-gray-400 divide-solid">
            <h1 className="font-bold text-2xl my-3">Home</h1>
            <Input />
            <Posts />
          </div>
        </div>
        <WhoToFollow />
      </section>
    </>
  );
}
export default Home;
