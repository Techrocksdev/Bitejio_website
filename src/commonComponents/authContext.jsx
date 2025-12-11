import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { getMyProfile } from "../apiServices/home/homeHttpService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("token-bit-user")
  );

  // const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const { data: profile, refetch } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getMyProfile,
    enabled: !!token,
    onError: (error) => {
      console.log(error);
    },
    select: (data) => data.results.user,
  });

  const login = (newToken) => {
    localStorage.setItem("token-bit-user", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token-bit-user");
    localStorage.removeItem("uid-bit-user");
    sessionStorage.removeItem("userLocation");
    setToken(null);
  };

  // const toggleSidebar = () => {
  //   setIsSidebarHidden((prev) => !prev);
  // };

  return (
    <AuthContext.Provider
      value={{
        profile,
        refetch,
        login,
        logout,
        token,
        // toggleSidebar,
        // isSidebarHidden,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
