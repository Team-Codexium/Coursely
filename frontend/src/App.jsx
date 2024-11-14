import { CourseDetails, CreateCourse, EditProfile, Login, MyCourses, Navbar, Register } from "./components/comps";
import { Dashboard, Home, Profile } from "./container";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useUserContext } from "./context/UserContext";

const App = () => {

  const {user, isAuthenticated } = useUserContext();


  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path={`${isAuthenticated ? "/" : "/dashboard"}`} element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path={`${user.role === "student" ? "/my-learnings" : "/my-courses"}`} element={<MyCourses />} />
            <Route path="/my-courses/create" element={<CreateCourse />} />
            <Route path="/profile/edit-profile" element={<EditProfile />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
