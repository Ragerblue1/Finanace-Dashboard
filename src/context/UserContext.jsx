import { createContext, useContext, useState } from "react";
import { users } from "../data/users";

const UserContext = createContext();
const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(users[0]);

  const isAdmin = currentUser?.role === "admin";

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}
export {useUser,UserContext}