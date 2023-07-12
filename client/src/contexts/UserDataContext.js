import React, { createContext, useState } from "react";

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    createdAt: "",
    displayName: "",
    email: "",
    memberId: "",
    memberRole: "",
    modifiedAt: "",
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
