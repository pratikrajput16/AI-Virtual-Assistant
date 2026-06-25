import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = { serverUrl, userData, setUserData };
  return (
    <div>
      <userDataContext.Provider value={{ serverUrl }}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
