import { createAuthClient } from 'better-auth/react';

const getBaseURL = () => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return "http://localhost:5000";
  }
  return "https://medi-store-frontend-pi.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
});
