import MenuPc from "../components/MenuPc";
import WhoToFollow from "../components/WhoToFollow";

function Home() {
  return (
    <>
      <section className="grid grid-cols-4 gap-4 px-36 ">
        <MenuPc />
        <div className="bg-green-500 ml-96   col-span-3"></div>
        <WhoToFollow />
      </section>
    </>
  );
}
export default Home;
