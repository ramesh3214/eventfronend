import React, { createContext, useState, useEffect } from "react";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [Login, setIsLogin] = useState(false);
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const logout = () => {
    setIsLogin(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.setItem("isLogin", false);
  };

  useEffect(() => {
    const savedLoginStatus = JSON.parse(localStorage.getItem("isLogin"));
    if (savedLoginStatus) {
      setIsLogin(savedLoginStatus);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLogin", JSON.stringify(Login));
    if (Login && user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [Login, user]);

  return (
    <Authcontext.Provider value={{ Login, setIsLogin, user, setUser, logout }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
