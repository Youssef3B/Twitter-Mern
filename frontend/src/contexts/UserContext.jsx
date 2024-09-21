import axios from "axios";
import { createContext, useContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, getUserFromHisId }}>
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
