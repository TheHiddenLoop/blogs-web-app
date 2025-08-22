import { useSetRecoilState } from "recoil";
import { authUserState, isCheckingAuthState } from "./checkAuth";
import { axiosInstance } from "../libs/axios";
import { userDataAtom } from "./atom";

export default function useCheckAuth() {
  const setAuthUser = useSetRecoilState(authUserState);
  const setIsCheckingAuth = useSetRecoilState(isCheckingAuthState);
  const setUserData=useSetRecoilState(userDataAtom);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      const user = res.data;
      if (!user.isVerified || !user) {
        setAuthUser(null);
      } else {
        setUserData(user);
        setAuthUser(user);
      }
      // const res = await axiosInstance.get("/check");
      // const user = res.data;

      // if (!user) {
      //   setAuthUser(null);
      // } else {
      //   setAuthUser(user);
      // }

    } catch (err) {
      console.error("Error in checkAuth:", err);
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  return checkAuth;
}
