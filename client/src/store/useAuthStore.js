import { useSetRecoilState } from "recoil";
import { axiosInstance } from "../libs/axios.js";
import { userState, authLoadingState } from "../atom/atoms.js";
import { toast } from "react-hot-toast";
import { authUserState } from "../atom/checkAuth.js";
import { userDataAtom } from "../atom/atom.js";

export function useAuthStore() {
  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(authLoadingState);
  const setAuthUser = useSetRecoilState(authUserState);
  const setUserData = useSetRecoilState(userDataAtom);

  const signup = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/signup", formData);
      setUser(res.data.user);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login", formData);

      if (!res.data.user.isVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }
      const user = res.data.user;
      setUser(user);
      setAuthUser(user);
      toast.success(res.data.message);

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/verify/otp", { email, otp });

      const user = res.data.user;
      setAuthUser(user);
      toast.success(res.data.message);

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const requestPassReset = async (email) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/reset/password", { email });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/reset-password", {
        token,
        password,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      setAuthUser(false);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      const updateData = {};
      if (data.profilePic) {
        updateData.profilepic = data.profilePic;
      }
      const res = await axiosInstance.post("/auth/update-profile", updateData);
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfileInfo = async (data) => {
    try {
      setLoading(true);

      const updateData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined
        )
      );

      if (Object.keys(updateData).length === 0) {
        toast.error("No changes to update");
        return;
      }

      const res = await axiosInstance.post("/auth/update-profile", updateData);
      toast.success("Profile updated!");
      setUserData(res.data.updatedData);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    login,
    verifyOtp,
    requestPassReset,
    resetPassword,
    logout,
    updateProfile,
    updateProfileInfo,
  };
}
