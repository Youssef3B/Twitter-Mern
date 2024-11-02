import { MdDeleteOutline } from "react-icons/md";

function Comment({ comment, user, deleteComment }) {
  if(user && comment){
    console.log(comment)
    console.log(user)
  }
  async function handleDeleteComment(e) {
    e.preventDefault();
    deleteComment(comment?._id);
  }
  
  return (
    <div className="my-4">
      <div className="bg-white p-4 rounded-lg border shadow-lg">
        <div className="flex justify-between items-center">
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
        {comment?.user?._id === user?._id ? <form onSubmit={handleDeleteComment} action="">
            <button className="bg-red-500 text-white p-2 rounded-lg text-lg font-semibold transition-all hover:bg-white hover:text-red-500 hover:border hover:border-red-500" ><MdDeleteOutline /></button>
          </form> : ""}
        </div>
        
        <h2 className="mt-4 font-semibold">{comment?.description}</h2>
      </div>
    </div>
  );
}
export default Comment;
