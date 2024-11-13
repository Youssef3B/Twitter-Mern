import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SaveContext = createContext();
axios.defaults.withCredentials = true;

function SaveProvider({ children }) {
  const [allSaves, setAllSaves] = useState([]);

  async function getAllSaves() {
    const url = `https://backend-opal-sigma.vercel.app/api/saves`;
    try {
      const res = await axios.get(url);
      if (res) {
        setAllSaves(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addSave(data) {
    const url = `https://backend-opal-sigma.vercel.app/api/saves`;
    try {
      const res = await axios.post(url, data);
      if (res) {
        console.log("Saved successfully added");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteSave(userId, postId) {
    const url = `https://backend-opal-sigma.vercel.app/api/saves`;

    // No need to pass userId and postId in the URL

    try {
      const res = await axios.delete(url, { data: { userId, postId } });
      if (res) {
        console.log("Save deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllSaves();
  }, []);
  return (
    <SaveContext.Provider
      value={{ setAllSaves, allSaves, addSave, deleteSave, getAllSaves }}
    >
      {children}
    </SaveContext.Provider>
  );
}

function useSave() {
  const context = useContext(SaveContext);
  if (context === undefined) {
    throw new Error("Save Context used outside the Save provider");
  }
  return context;
}

export { useSave, SaveProvider };
