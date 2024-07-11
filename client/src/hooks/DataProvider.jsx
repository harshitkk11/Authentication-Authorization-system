import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const isLogin = localStorage.getItem("islogin");
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    async function fetchData() {
      if (isLogin) {
        try {
          const response = await axios.get("/getuser");
          if (response) {
            const res = response.data.user;
            setUserData({
              name: res.name,
              username: res.username,
              email: res.email,
              id: res._id,
            });
          }
        } catch (err) {
          localStorage.removeItem("islogin");
        }
      }
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => {
  return useContext(DataContext);
};
