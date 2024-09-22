function UserCard({ user }) {
  return (
    <div className="border rounded-lg p-6 text-center">
      <img
        className="h-24 w-24 rounded-full object-cover object-center mx-auto"
        src={`/uploads/${user?.avatar}`}
        alt=""
      />
      <h3 className="font-semibold mt-2">{user?.fullName}</h3>
      <p className="text-gray-600 mb-6">{user?.userName}</p>
      <button className="bg-sky-500 px-5 py-1 text-white rounded-full font-semibold hover:bg-sky-600 transition-all">
        Follow
      </button>
    </div>
  );
}
export default UserCard;
