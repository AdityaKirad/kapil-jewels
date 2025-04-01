import { betterAuth } from "better-auth";
import { cache } from "react";
import { authConfig } from "./config";

const {
  handler,
  api: {
    getSession: uncachedGetSession,
    signInEmail,
    signOut,
    signUpEmail,
    changePassword,
    setPassword,
    resetPassword,
    forgetPassword,
  },
} = betterAuth(authConfig);

const getSession = cache(uncachedGetSession);

export {
  handler,
  getSession,
  changePassword,
  setPassword,
  resetPassword,
  forgetPassword,
  signInEmail,
  signOut,
  signUpEmail,
};
