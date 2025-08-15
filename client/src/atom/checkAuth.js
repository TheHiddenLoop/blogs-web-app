import { atom } from "recoil";

export const authUserState = atom({
  key: "authUserState",
  default: null,
});

export const isCheckingAuthState = atom({
  key: "isCheckingAuthState",
  default: true,
});
