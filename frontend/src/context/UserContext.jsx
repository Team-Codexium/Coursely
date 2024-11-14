import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();


const UserProvider = ({children}) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  
const getUser = async (token) => {
  try {
    // Calling backend to get user information
    const response = await axios.get(`${import.meta.env.VITE_URL}/users/getUser`, {
      headers: { Authorization: `Bearer ${token}` }, withCredentials: true,
    });
    
    // Saving data of user in as var
    setUser(response.data.user);
    setIsAuthenticated(true);
  } catch (error) {
    // Removing token from local storage if user is not authenticated
    sessionStorage.removeItem("token");
    console.log("Error fetching user:", error);
    setIsAuthenticated(false);
  }
};


useEffect(() => {
  // Calling getUser only when we have token
  if (cookies.token || sessionStorage.getItem('token')) {
    // retrieving token from cookie or sessionStorage
    const jwtToken = cookies.token || sessionStorage.getItem('token');
    getUser(jwtToken);
  } else {
    setIsAuthenticated(false);
  }
}, [cookies.token, user]);

useEffect(() => {
  //Navingation accordingly
  if (isAuthenticated) {
    navigate('/dashboard');
  } else {
    navigate('/');
  }
}, [isAuthenticated]);

useEffect(() => {
  if (cookies.token) {
    sessionStorage.setItem('token', cookies.token);
  }
}, [cookies.token]);


const logout = () => {
  removeCookie('token');
  sessionStorage.removeItem('token');
  setIsAuthenticated(false);
  setUser(null);
  navigate('/');  
};

  return (
    <UserContext.Provider value={{user, setUser, cookies, setCookie, logout, isAuthenticated, setIsAuthenticated}}>
      {children}
    </UserContext.Provider>
  )
}


export default UserProvider;

export const useUserContext = () => useContext(UserContext);