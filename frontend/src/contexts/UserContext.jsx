import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, createContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();

  async function login(email, password) {
    const data = { email, password };
    try {
      const url = "http://localhost:5000/api/auth/login";
      const res = await axios.post(url, data);
      if (res.data.data) {
        const token = res.data.data;
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        setUser(decoded);
        toast.success("Login successful");

        return decoded; // Return the decoded user data
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      throw error; // Re-throw the error so it can be caught in the component
    }
  }
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    // Navigate("/login");
    // toast.success("Logged out successfully");
    window.location.reload();
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
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
