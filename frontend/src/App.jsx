import { CourseDetails, CreateCourse, EditProfile, Login, MyCourses, Navbar, Register } from "./components/comps";
import { Dashboard, Home, Profile } from "./container";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const getUser = async (token) => {
    try {
      // Calling backend to get user information
      const response = await axios.get("http://localhost:3000/users/getUser", {
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
    <div>
      <Toaster />
      <Navbar logout={logout} user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} setCookie={setCookie} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} user={user} setCookie={setCookie} />} />
          </>
        ) : (
          <>
            <Route path={`${isAuthenticated ? "/" : "/dashboard"}`} element={<Dashboard user={user} logout={logout}  />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path={`${user.role === "student" ? "/my-learnings" : "/my-courses"}`} element={<MyCourses user={user} />} />
            <Route path="/my-courses/create" element={<CreateCourse user={user} />} />
            <Route path="/profile/edit-profile" element={<EditProfile user={user} cookies={cookies} setUser={setUser}/>} />
            <Route path="/courses/:id" element={<CourseDetails user={user} cookies={cookies} setUser={setUser}/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
