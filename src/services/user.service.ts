import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_BASE_URL}/auth/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      if (data === null) {
        return { data: null, error: { message: "data is missing" } };
      }
      return data;
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
