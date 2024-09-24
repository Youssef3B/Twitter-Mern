import { useState } from "react";
import InputEmoji from "react-input-emoji";
import Comment from "./Comment";
import { useComment } from "../contexts/CommentContext";

function Comments({ id, user }) {
  const [text, setText] = useState("");
  const { CreateComment } = useComment();

  function handleSubmit(e) {
    e.preventDefault();
    const data = { user: user?._id, post: id, description: text };
    CreateComment(data);
    setText("");
  }

  return (
    <div className="my-6">
      <form className="w-full" onSubmit={handleSubmit} action="">
        <h3 className="font-semibold text-lg">Comments</h3>
        <div className="my-2 flex items-center">
          <div>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="/user.jpg"
              alt=""
            />
          </div>
          <div className="w-full">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              placeholder="Type a Comment"
              background="white"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500 text-white py-1 px-4 rounded-full font-semibold transition-all hover:bg-sky-600"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Section Of Comments  */}
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}
export default Comments;
