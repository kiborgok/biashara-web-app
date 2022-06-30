import React, { useState } from "react";
import useUser from '../hooks/useUser'

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const userData = useUser()
  const [user, setUser] = useState(userData);
  return (
    <UserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
