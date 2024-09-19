import { MdDateRange } from "react-icons/md";

function UserInfo() {
  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold">ussef3b</h3>
        <p className="text-gray-600">@youssef3b07</p>
        <p className="my-2 flex items-center space-x-2">
          <MdDateRange />
          <span className="font-semibold text-gray-600">
            Joined August 2017
          </span>
        </p>
        <div className="flex space-x-4">
          <p className="text-gray-500">
            <span className="font-bold text-black">135 </span>Following
          </p>
          <p className="text-gray-500">
            <span className="font-bold text-black">10 </span>Followers
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
export default UserInfo;
