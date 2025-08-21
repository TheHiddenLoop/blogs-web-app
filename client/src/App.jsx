import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Artical } from "./pages/Artical";
import { CreateBlog } from "./pages/CreateBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerify from "./pages/EmailVarify";
import RequesResetPassword from "./pages/RequesResetPassword";
import ResetPassword from "./pages/ResetPassword";

import { authUserState, isCheckingAuthState } from "./atom/checkAuth";
import useCheckAuth from "./atom/useCheckAuth";
import { UserBlogs } from "./pages/UserBlogs";
import {Setting} from "./pages/Setting.jsx"

export default function App() {
  const isChecking = useRecoilValue(isCheckingAuthState);
  const authUser = useRecoilValue(authUserState);
  const checkAuth = useCheckAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isChecking && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="font-poppins bg-[#f7f7f7] min-h-screen">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/artical/:id" element={authUser ? <Artical /> : <Navigate to="/login" />} />
        <Route path="/create/blog" element={authUser ? <CreateBlog /> : <Navigate to="/login" />} />
        <Route path="/all/blogs" element={authUser ? <UserBlogs /> : <Navigate to="/login" />} />
        <Route path="/setting" element={authUser ? <Setting /> : <Navigate to="/login" />} />


        {/* Auth-related routes */}
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/request-reset-password" element={<RequesResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}
