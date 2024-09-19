function UserCard() {
  return (
    <div className="border rounded-lg p-6 text-center">
      <img
        className="h-24 w-24 rounded-full object-cover object-center mx-auto"
        src="/user.jpg"
        alt=""
      />
      <h3 className="font-semibold">Youssef Ababou</h3>
      <p className="text-gray-600 mb-6">@3b youssef</p>
      <button className="bg-sky-500 px-5 py-1 text-white rounded-full font-semibold hover:bg-sky-600 transition-all">
        Follow
      </button>
    </div>
  );
}
export default UserCard;
