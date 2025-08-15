// <CHANGE> Added Shield icon for logo and imported AuthPattern
import { Mail, Lock, Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { useRecoilValue } from 'recoil';
import { authLoadingState } from '../atom/atoms';
import AuthPattern from '../components/AuthPattern';

export default function Login() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuthStore();
  const loading = useRecoilValue(authLoadingState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isLoggin = await login(formData);

      if (isLoggin) {
        setTimeout(() => navigate("/"), 100);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-69px)] bg-gray-50">
     <div className="w-full lg:w-1/2 flex justify-center items-center p-6 bg-white">
  <div className="w-full max-w-sm space-y-6"> {/* reduced from max-w-md */}
    <div className="text-center">
      <div className="flex justify-center mb-3">
        <div className="p-2.5 bg-blue-100 rounded-full">
          <Shield className="w-7 h-7 text-blue-600" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
      <p className="text-gray-600 text-sm">Sign in to your account</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <div className="relative">
          <Mail size={18} className="absolute left-3 top-2.5 text-blue-500" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
            className="pl-9 pr-3 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-2.5 text-blue-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="pl-9 pr-10 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Link
          to="/request-reset-password"
          className="text-sm text-blue-600 hover:text-blue-500 font-medium"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>

      <AuthPattern />
    </div>
  );
}