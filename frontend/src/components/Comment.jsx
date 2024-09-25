function Comment({ comment }) {
  return (
    <div className="my-4">
      <div className="bg-white p-4 rounded-lg border shadow-lg">
        <div className="flex items-center space-x-3">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={`/uploads/${comment?.user?.avatar}`}
            alt=""
          />
          <div>
            <h3 className="font-semibold">
              {comment?.user?.fullName}
              <span className="font-light text-gray-600">13h</span>
            </h3>
            <p className="text-sm text-gray-600"> {comment?.user?.userName}</p>
          </div>
        </div>
        <h2 className="mt-4 font-semibold">{comment?.description}</h2>
      </div>
    </div>
  );
}
export default Comment;
