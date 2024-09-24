import { useState } from "react";
import InputEmoji from "react-input-emoji";
import Comment from "./Comment";

function Comments() {
  const [text, setText] = useState("");

  return (
    <div className="my-6">
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
      </div>

      {/* Section Of Comments  */}
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}
export default Comments;
