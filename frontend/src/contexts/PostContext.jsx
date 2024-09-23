import axios from "axios";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";

const PostContext = createContext();

function PostProvider({ children }) {
  async function createPost(data) {
    const url = `http://localhost:5000/api/poste`;
    try {
      const res = await axios.post(url, data);
      if (res) {
        console.log("Post created successfully");
        toast.success("Post created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <PostContext.Provider value={{ createPost }}>
      {children}
    </PostContext.Provider>
  );
}

function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("User Context used outside the Post Provider");
  }
  return context;
}

export { usePost, PostProvider };
