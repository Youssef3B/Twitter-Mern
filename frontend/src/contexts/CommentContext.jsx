import axios from "axios";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";

const CommentContext = createContext();

function CommentProvider({ children }) {
  async function CreateComment(data) {
    const url = `http://localhost:5000/api/comments`;

    try {
      const res = await axios.post(url, data);
      if (res) {
        toast.success("comment created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("comment creation failed");
    }
  }
  return (
    <CommentContext.Provider value={{ CreateComment }}>
      {children}
    </CommentContext.Provider>
  );
}

function useComment() {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error("User Context used outside the Post Provider");
  }
  return context;
}

export { useComment, CommentProvider };
