import { Loader2, Mail, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authLoadingState } from '../atom/atoms';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import AuthPattern from '../components/AuthPattern';
import { toast } from 'react-hot-toast';

export default function RequestResetPassword() {
  const loading = useRecoilValue(authLoadingState);
  const [email, setEmail] = useState('');
  const { requestPassReset } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isRequesting = await requestPassReset(email);
      if (isRequesting) {
        toast.success("Reset link sent!");
        setTimeout(() => navigate("/login"), 100);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-69px)] bg-gray-50">
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 bg-white">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2.5 bg-blue-100 rounded-full">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-2.5 text-blue-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-9 pr-3 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <AuthPattern
        title="Password Recovery"
        subtitle="Don't worry! It happens to the best of us. Enter your email and we'll send you a link to reset your password."
      />
    </div>
  );
}
