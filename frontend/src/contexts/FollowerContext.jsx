import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const FollowerContext = createContext();
axios.defaults.withCredentials = true;

function FollowerProvider({ children }) {
  const [allFollowers, setAllFollowers] = useState([]);

  async function getAllFollowers() {
    const url = `https://twitter-mern-backend-nlub.onrender.com/api/followers`;

    try {
      const res = await axios.get(url);
      if (res) {
        setAllFollowers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addAFollow(data) {
    const url = `https://twitter-mern-backend-nlub.onrender.com/api/followers`;

    try {
      const res = await axios.post(url, data);
      if (res) {
        console.log("follow add success");
        await getAllFollowers(); // Refresh the followers list
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFollow(userWhoFollow, userWhoFollowed) {
    const url = `https://twitter-mern-backend-nlub.onrender.com/api/followers`;
    try {
      const res = await axios.delete(url, {
        data: { userWhoFollow, userWhoFollowed },
      });
      if (res) {
        console.log("follow deleted successfully");
        await getAllFollowers(); // Refresh the followers list
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllFollowers();
  }, []);

  return (
    <FollowerContext.Provider
      value={{ allFollowers, getAllFollowers, addAFollow, deleteFollow }}
    >
      {children}
    </FollowerContext.Provider>
  );
}

function useFollower() {
  const context = useContext(FollowerContext);
  if (context === undefined) {
    throw new Error("User Context used outside the Post Provider");
  }
  return context;
}

export { useFollower, FollowerProvider };
