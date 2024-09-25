import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CommentContext = createContext();

function CommentProvider({ children }) {
  const [allComments, setAllComments] = useState([]);
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

  async function getAllComments() {
    const url = `http://localhost:5000/api/comments`;
    try {
      const res = await axios.get(url);
      if (res) {
        setAllComments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllComments();
  }, []);
  return (
    <CommentContext.Provider
      value={{ CreateComment, allComments, getAllComments }}
    >
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
