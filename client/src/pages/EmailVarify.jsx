import { useRef, useState } from "react";
import { authLoadingState, userState } from '../atom/atoms';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { Loader2, Shield } from 'lucide-react';
import AuthPattern from '../components/AuthPattern';
import { toast } from 'react-hot-toast';

export default function EmailVerify() {
  const inputRefs = useRef(Array(6).fill().map(() => null));
  const [otp, setOtp] = useState(Array(6).fill(""));
  const users = useRecoilValue(userState);
  const { verifyOtp } = useAuthStore();
  const navigate = useNavigate();
  const loading = useRecoilValue(authLoadingState);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isLoggin = await verifyOtp(users.email, otp.join(""));
      if (isLoggin) {
        toast.success("Email verified!");
        setTimeout(() => navigate("/"), 100);
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Verify Your Email</h1>
            <p className="text-gray-600 text-sm">
              Enter the 6-digit code we sent to <span className="font-semibold text-blue-600">{users.email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-10 h-10 text-lg text-center font-bold text-blue-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <span className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer">
                  Resend Code
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      <AuthPattern
        title="Almost Done!"
        subtitle="We've sent a verification code to your email. Enter it here to complete your account setup and get started."
      />
    </div>
  );
}
