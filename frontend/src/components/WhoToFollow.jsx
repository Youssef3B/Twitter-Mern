import User from "./User";

function WhoToFollow() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg my-10">
      <div className="divide-y divide-gray-400">
        <h2 className="text-xl font-bold mb-2">Who to Follow</h2>
        <User />
        <User />
        <User />
      </div>
    </div>
  );
}
export default WhoToFollow;
