import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Home } from "./pages/Home";
import { Artical } from "./pages/Artical";
import { CreateBlog } from "./pages/CreateBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerify from "./pages/EmailVarify";
import RequesResetPassword from "./pages/RequesResetPassword";
import ResetPassword from "./pages/ResetPassword";
import { UserBlogs } from "./pages/UserBlogs";
import { Setting } from "./pages/Setting.jsx";

import { authUserState, isCheckingAuthState } from "./atom/checkAuth";
import useCheckAuth from "./atom/useCheckAuth";

import Layout from "./Layout/Layout.jsx"; // 👈 new layout

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
      <Routes>
        {/* ✅ Protected Layout with Sidebar + Navbar */}
        <Route
          path="/"
          element={authUser ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="artical/:id" element={<Artical />} />
          <Route path="create/blog" element={<CreateBlog />} />
          <Route path="all/blogs" element={<UserBlogs />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Auth-related routes */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/request-reset-password" element={<RequesResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}
