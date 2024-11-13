import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CommentContext = createContext();

function CommentProvider({ children }) {
  const [allComments, setAllComments] = useState([]);
  async function CreateComment(data) {
    const url = `https://twitter-mern-kappa.vercel.app/api/comments`;

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

  async function deleteComment(id) {
    const url = `https://twitter-mern-kappa.vercel.app/api/comments/${id}`;
    try {
      const res = await axios.delete(url);
      if (res) {
        toast.success("Comment Removed Successfully");
        setAllComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Comment deletion failed");
    }
  }

  useEffect(() => {
    getAllComments();
  }, []);
  return (
    <CommentContext.Provider
      value={{ CreateComment, allComments, getAllComments, deleteComment }}
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
