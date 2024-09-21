import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  async function getUserFromHisId(id) {
    const url = `http://localhost:5000/api/user/getUserById/${id}`;
    const res = await axios.get(url);
    if (res) {
      setUser(res.data);
    }
  }

  async function UpdateUserFromHisId(id, formData) {
    const url = `http://localhost:5000/api/user/editUserById/${id}`;

    try {
      const res = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart
        },
      });

      if (res) {
        console.log("Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <UserContext.Provider
      value={{ user, getUserFromHisId, UpdateUserFromHisId }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("User Context used outside the User Provider");
  }
  return context;
}

export { UserProvider, useUser };
