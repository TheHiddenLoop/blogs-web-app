import { Lock, Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { authLoadingState } from '../atom/atoms';
import AuthPattern from '../components/AuthPattern';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const { token } = useParams();
  const { resetPassword } = useAuthStore();
  const loading = useRecoilValue(authLoadingState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const success = await resetPassword(token, formData.password);
      if (success) {
        toast.success("Password reset successfully");
        setTimeout(() => navigate("/login"), 100);
      }
    } catch {
      toast.error("Reset failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)] bg-gray-50">
      
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 bg-white">
        <div className="w-full max-w-sm space-y-6">
          
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2.5 bg-blue-100 rounded-full">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset Password</h1>
            <p className="text-gray-600 text-sm">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-2.5 text-blue-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter new password"
                  className="pl-9 pr-10 py-2.5 w-full border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-2.5 text-blue-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm new password"
                  className="pl-9 pr-10 py-2.5 w-full border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 
                transition-colors flex items-center justify-center text-sm"
            >
              {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              Reset Password
            </button>
          </form>
        </div>
      </div>

      <AuthPattern 
    title="Join Our Community" 
    subtitle="Create your account and become part of our growing community of users who trust our platform." 
  />
    </div>
  );
}
