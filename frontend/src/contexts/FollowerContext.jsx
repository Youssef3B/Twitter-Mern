import { createContext, useContext } from "react";

const FollowerContext = createContext();

function FollowerProvider({ children }) {
  return (
    <FollowerContext.Provider value={{}}>{children}</FollowerContext.Provider>
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
