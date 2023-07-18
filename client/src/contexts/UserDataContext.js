import React, { createContext, useState } from "react";

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    memberId: "",
    memberRole: "",
    thumbNailImage: `${process.env.PUBLIC_URL}/image/profile.jpeg`,
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
